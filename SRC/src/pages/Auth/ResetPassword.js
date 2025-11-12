import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
  updatePassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { auth, db } from "../../firebase/config";

const PASSWORD_HISTORY_FIELDS = ["lastPasswords", "passwordHistory"];

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [oobCode, setOobCode] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("oobCode");
    setOobCode(code);
    if (code) {
      verifyPasswordResetCode(auth, code)
        .then(setEmail)
        .catch(() => setError("Invalid or expired password reset link."));
    }
  }, []);

  const validatePassword = (password) => {
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(password)) return "Must include an uppercase letter.";
    if (!/[a-z]/.test(password)) return "Must include a lowercase letter.";
    if (!/\d/.test(password)) return "Must include a number.";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      return "Must include a special character.";
    return null;
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!oobCode || !email) {
      setError("Invalid password reset link.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    setLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      const usersRef = doc(db, "users", email);
      const userDoc = await getDoc(usersRef);
      let passwordHistory = [];
      if (userDoc.exists()) {
        const data = userDoc.data();
        for (const field of PASSWORD_HISTORY_FIELDS) {
          if (Array.isArray(data[field])) {
            passwordHistory = data[field];
            break;
          }
        }
      }
      // Compare new password with previous hashes
      const reused = await Promise.all(
        passwordHistory.map((hash) => bcrypt.compare(newPassword, hash))
      );
      if (reused.includes(true)) {
        setError("You cannot reuse your previous password!");
        setLoading(false);
        return;
      }
      // Update password in Firebase Auth (user must be signed in)
      await signInWithEmailAndPassword(auth, email, newPassword);
      await updatePassword(auth.currentUser, newPassword);
      // Hash new password and update Firestore
      const newHash = await bcrypt.hash(newPassword, 10);
      const updatedHistory = [...passwordHistory, newHash].slice(-5);
      await updateDoc(usersRef, {
        lastPasswords: updatedHistory,
        lastUpdated: new Date().toISOString(),
      });
      setSuccess("Password reset successful! You may now log in.");
    } catch (err) {
      setError(err.message || "Password reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxWidth={400}
      mx="auto"
      my={8}
      p={4}
      borderRadius={2}
      boxShadow={2}
      bgcolor="background.paper"
    >
      <Typography variant="h5" mb={2}>
        Reset Password
      </Typography>
      <Typography variant="body2" mb={3} color="text.secondary">
        Enter a new password. You cannot reuse your previous password.
      </Typography>
      <form onSubmit={handleReset}>
        <TextField
          label="New Password"
          type="password"
          fullWidth
          required
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          label="Confirm New Password"
          type="password"
          fullWidth
          required
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mt: 1 }}>
            {success}
          </Alert>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Reset Password"}
        </Button>
      </form>
    </Box>
  );
};

export default ResetPassword;
