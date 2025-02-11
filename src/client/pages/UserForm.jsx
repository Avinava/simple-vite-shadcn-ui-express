import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { userService } from '@/lib/api';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Loader2 } from "lucide-react";

const userSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email address')
});

export function UserForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: ''
    }
  });

  useEffect(() => {
    if (id) {
      loadUser();
    }
  }, [id]);

  const loadUser = async () => {
    try {
      const response = await userService.getUser(id);
      if (response.success) {
        reset(response.data);
      }
    } catch (error) {
      setError('root', {
        message: error.message || 'Failed to load user'
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = id
        ? await userService.updateUser(id, data)
        : await userService.createUser(data);
      
      if (response.success) {
        toast({
          title: "Success",
          description: id ? "User updated successfully" : "User created successfully",
        });
        navigate('/users');
      }
    } catch (error) {
      setError('root', {
        message: error.message || 'Failed to save user'
      });
    }
  };

  return (
    <div className="container max-w-6xl p-8">
      <Card>
        <CardHeader>
          <CardTitle>{id ? 'Edit User' : 'Create User'}</CardTitle>
          <CardDescription>
            {id ? 'Update user information' : 'Add a new user to the system'}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {errors.root && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errors.root.message}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Enter name"
                className={errors.name ? "border-destructive" : ""}
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="Enter email"
                className={errors.email ? "border-destructive" : ""}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/users')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {id ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                id ? 'Update' : 'Create'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}