import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* trái*/}
        <div className="flex-1">
          <Link to="/" className="font-bold text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 rounded-lg text-white">
              Hoàng
            </span>
            <span className="dark:text-white">Blog</span>
          </Link>
          <p className="text-sm mt-5 text-muted-foreground">
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>

        {/* phải */}
        <div className="flex-1">
          <Card>
            <CardContent className="pt-6">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="username">Your username</Label>
                  <Input 
                    type="text"
                    placeholder="Username"
                    id="username"
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Your email</Label>
                  <Input 
                    type="email"
                    placeholder="name@company.com"
                    id="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Your password</Label>
                  <Input 
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={handleChange}
                  />
                </div>
                <Button 
                  className="bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 hover:opacity-90"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </form>
              <div className="flex gap-2 text-sm mt-5">
                <span className="text-muted-foreground">Have an account?</span>
                <Link to="/sign-in" className="text-blue-500 hover:underline">
                  Sign In
                </Link>
              </div>
            </CardContent>
          </Card>
          {errorMessage && (
            <Alert variant="destructive" className="mt-5">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}