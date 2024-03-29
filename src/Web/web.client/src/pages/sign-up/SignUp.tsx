import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { Alert, styled } from "@mui/material";
import { toast } from "react-toastify";
import { useAuth } from "../../authentication/authContext";
import SimpleBackdrop from "../../components/Backdrop";

export default function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState("");
    const { register, isLoading } = useAuth();

    const isValidRegistration = () => {
        return firstName && lastName && email && password;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case "email":
                if (isValidEmail(value)) {
                    setWarning("");
                    setEmail(value);
                } else {
                    setWarning("Please enter a valid email address.");
                }
                break;
            case "password":
                if (isValidPassword(value)) {
                    setWarning("");
                    setPassword(value);
                } else {
                    setWarning("Please enter a valid password.");
                }
                break;
            case "firstName":
                if (value) {
                    setWarning("");
                    setFirstName(value);
                } else {
                    setWarning("Please enter a first name.");
                }
                break;
            case "lastName":
                if (value) {
                    setWarning("");
                    setLastName(value);
                } else {
                    setWarning("Please enter a last name.");
                }
                break;
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isValidRegistration()) {
            toast.warn("Please complete all fields");
        } else {
            register({
                firstName,
                lastName,
                email,
                password,
            });
        }
    };

    return (
        <>
            <SimpleBackdrop open={isLoading} />
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Alert variant="outlined" severity="info">
                                    Password must contain:
                                    <PasswordRequirements>
                                        <li>At least six characters</li>
                                        <li>Uppercase letter</li>
                                        <li>Lowercase letter</li>
                                        <li>Number</li>
                                        <li>Special character</li>
                                    </PasswordRequirements>
                                </Alert>
                            </Grid>
                            {warning && (
                                <Grid item xs={12}>
                                    <Alert severity="warning">{warning}</Alert>
                                </Grid>
                            )}
                        </Grid>

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
        return true;
    }
    return false;
}

function isValidPassword(password: string) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (passwordRegex.test(password)) {
        return true;
    }
    return false;
}

const PasswordRequirements = styled("ul")({
    margin: 0,
});
