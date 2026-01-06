"use client"

import { Suspense, useState } from "react"
import { LayoutDashboard, Users, Activity, BarChart3, ArrowUpRight, ArrowDownRight, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function AdminContent() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            Admin Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">Project Analytics & System Monitoring</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search records..." className="pl-9 h-10" />
          </div>
          <Button variant="outline" className="h-10 bg-transparent">
            Export PDF
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Screenings", value: "1,248", trend: "+12%", up: true, icon: Users },
          { label: "High Risk Detected", value: "312", trend: "+5%", up: true, icon: Activity },
          { label: "Model Accuracy", value: "94.5%", trend: "Stable", up: null, icon: BarChart3 },
          { label: "Active Sessions", value: "42", trend: "-3%", up: false, icon: LayoutDashboard },
        ].map((stat, i) => (
          <Card key={i} className="border-border">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <stat.icon className="h-5 w-5" />
                </div>
                {stat.up !== null && (
                  <div className={`flex items-center text-xs font-bold ${stat.up ? "text-green-600" : "text-red-600"}`}>
                    {stat.up ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                    {stat.trend}
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Table */}
        <Card className="lg:col-span-2 border-border">
          <CardHeader>
            <CardTitle>Recent Screening Activity</CardTitle>
            <CardDescription>Live updates from active screening sessions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr className="text-left font-medium text-muted-foreground">
                    <th className="h-10 px-2">ID</th>
                    <th className="h-10 px-2">Age Group</th>
                    <th className="h-10 px-2">Score</th>
                    <th className="h-10 px-2">Risk Level</th>
                    <th className="h-10 px-2">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { id: "#4012", age: "Child", score: "8/10", risk: "High", time: "2 mins ago" },
                    { id: "#4011", age: "Toddler", score: "2/10", risk: "Low", time: "15 mins ago" },
                    { id: "#4010", age: "Adult", score: "5/10", risk: "Moderate", time: "1 hour ago" },
                    { id: "#4009", age: "Child", score: "9/10", risk: "High", time: "3 hours ago" },
                    { id: "#4008", age: "Toddler", score: "1/10", risk: "Low", time: "5 hours ago" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="p-2 font-mono text-xs">{row.id}</td>
                      <td className="p-2">{row.age}</td>
                      <td className="p-2">{row.score}</td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            row.risk === "High"
                              ? "bg-red-100 text-red-700"
                              : row.risk === "Moderate"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-green-100 text-green-700"
                          }`}
                        >
                          {row.risk}
                        </span>
                      </td>
                      <td className="p-2 text-muted-foreground">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <div className="space-y-8">
          <Card border-border>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span>API Response Time</span>
                  <span>142ms</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[85%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span>Database Load</span>
                  <span>12%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-[12%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span>Storage Usage</span>
                  <span>4.2GB / 20GB</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[21%]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            variant="outline"
            className="w-full border-dashed border-2 hover:bg-accent/5 py-8 flex flex-col gap-2 bg-transparent"
          >
            <span className="font-bold">Update ML Model</span>
            <span className="text-xs text-muted-foreground italic">Current: Random Forest v2.4</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={null}>
      <AdminContent />
    </Suspense>
  )
}
