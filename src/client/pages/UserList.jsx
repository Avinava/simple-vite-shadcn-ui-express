import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { userService } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  RotateCw,
  AlertCircle,
  Users,
  UserPlus,
  UserMinus,
  Calendar,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Chart configuration
const chartConfig = {
  users: {
    label: "New Registrations",
    color: "oklch(0.646 0.222 41.116)", // Using the chart-1 color from design system
  },
  weekly: {
    label: "Weekly",
    color: "oklch(0.488 0.243 264.376)", // Using the dark theme chart-1 color for better visibility
  },
  monthly: {
    label: "Monthly",
    color: "oklch(0.696 0.17 162.48)", // Using the dark theme chart-2 color for better visibility
  },
};

export function UserList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "list";

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeChart, setActiveChart] = useState("weekly");
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    userId: null,
  });
  const [filters, setFilters] = useState({
    role: "all",
    status: "all",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  // Update URL when tab changes
  useEffect(() => {
    if (activeTab !== "list") {
      setSearchParams({ tab: activeTab });
    } else {
      setSearchParams({});
    }
  }, [activeTab, setSearchParams]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getUsers();
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      setError(error.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (userId) => {
    setDeleteDialog({ isOpen: true, userId });
  };

  const handleDeleteConfirm = async () => {
    try {
      setError(null);
      const response = await userService.deleteUser(deleteDialog.userId);
      if (response.success) {
        await loadUsers();
      }
    } catch (error) {
      setError(error.message || "Failed to delete user");
    } finally {
      setDeleteDialog({ isOpen: false, userId: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, userId: null });
  };

  // Prepare data for charts
  const usersByTime = useMemo(() => {
    // Group by weeks and months
    return users.reduce(
      (acc, user) => {
        const date = new Date(user.createdAt);

        // Monthly grouping
        const monthKey = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        });

        // Weekly grouping - using ISO week
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        const weekKey = weekStart.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });

        // Update the accumulators
        acc.weekly[weekKey] = (acc.weekly[weekKey] || 0) + 1;
        acc.monthly[monthKey] = (acc.monthly[monthKey] || 0) + 1;

        return acc;
      },
      { weekly: {}, monthly: {} }
    );
  }, [users]);

  // Convert to chart format
  const chartData = useMemo(() => {
    const weekly = Object.entries(usersByTime.weekly).map(([date, count]) => ({
      date,
      weekly: count,
    }));

    const monthly = Object.entries(usersByTime.monthly).map(
      ([date, count]) => ({
        date,
        monthly: count,
      })
    );

    // Combine for display
    return {
      weekly,
      monthly,
      totals: {
        weekly: weekly.reduce((acc, curr) => acc + curr.weekly, 0),
        monthly: monthly.reduce((acc, curr) => acc + curr.monthly, 0),
      },
    };
  }, [usersByTime]);

  const stats = useMemo(
    () => ({
      total: users.length,
      recent: users.filter((user) => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return new Date(user.createdAt) > thirtyDaysAgo;
      }).length,
    }),
    [users]
  );

  const filteredUsers = users.filter((user) => {
    if (filters.role !== "all" && user.role !== filters.role) return false;
    if (
      filters.status !== "all" &&
      user.isActive !== (filters.status === "active")
    )
      return false;
    return true;
  });

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center min-h-[200px]">
          <RotateCw className="mr-2 h-4 w-4 animate-spin" />
          Loading users...
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage system users</CardDescription>
            </div>
            <Button asChild>
              <Link to="/users/new">Add User</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 mb-4 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium leading-none">
                        Total Users
                      </p>
                      <p className="text-2xl font-bold">{stats.total}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <UserPlus className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium leading-none">
                        New Users (30d)
                      </p>
                      <p className="text-2xl font-bold">{stats.recent}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium leading-none">
                        Average Monthly
                      </p>
                      <p className="text-2xl font-bold">
                        {(
                          stats.total /
                          Math.max(Object.keys(usersByTime.monthly).length, 1)
                        ).toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-4">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="list">
              <div className="flex gap-4 mb-4">
                <Select
                  value={filters.role}
                  onValueChange={(value) =>
                    setFilters((f) => ({ ...f, role: value }))
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="USER">User</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="EDITOR">Editor</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.status}
                  onValueChange={(value) =>
                    setFilters((f) => ({ ...f, status: value }))
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {!error && filteredUsers.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No users found.{" "}
                  {users.length === 0
                    ? "Create your first user to get started."
                    : "Try adjusting your filters."}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{user.name}</span>
                            {user.phoneNumber && (
                              <span className="text-sm text-muted-foreground">
                                {user.phoneNumber}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{user.email}</span>
                            {user.notifyByEmail && (
                              <span className="text-xs text-muted-foreground">
                                Notifications enabled
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.role === "ADMIN"
                                ? "destructive"
                                : user.role === "EDITOR"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {user.role.toLowerCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={user.isActive ? "outline" : "secondary"}
                          >
                            {user.isActive ? "active" : "inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/users/${user.id}`}>Edit</Link>
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteClick(user.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                  <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>User Growth</CardTitle>
                    <CardDescription>
                      Registration trends over time
                    </CardDescription>
                  </div>
                  <div className="flex">
                    {["weekly", "monthly"].map((key) => (
                      <button
                        key={key}
                        data-active={activeChart === key}
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                        onClick={() => setActiveChart(key)}
                      >
                        <span className="text-xs text-muted-foreground">
                          {chartConfig[key].label}
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                          {chartData.totals[key].toLocaleString()}
                        </span>
                      </button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="px-2 sm:p-6">
                  <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[350px] w-full"
                  >
                    <BarChart
                      accessibilityLayer
                      data={chartData[activeChart]}
                      margin={{
                        top: 10,
                        right: 20,
                        left: 20,
                        bottom: 20,
                      }}
                    >
                      <CartesianGrid
                        vertical={false}
                        className="stroke-muted"
                      />
                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        minTickGap={32}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            className="w-[150px]"
                            nameKey="registrations"
                            labelFormatter={(value) => `${value}`}
                          />
                        }
                      />
                      <Bar
                        dataKey={activeChart}
                        fill={`var(--color-${activeChart})`}
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <AlertDialog
        open={deleteDialog.isOpen}
        onOpenChange={(isOpen) => !isOpen && handleDeleteCancel()}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user and remove their data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteCancel}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
