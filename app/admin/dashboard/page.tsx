import { ProtectedRoute } from "../../../components/admin/auth/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  TrendingUp, 
  Plus, 
  Calendar,
  Upload,
  Send,
  Activity,
  ArrowUp,
  ArrowDown
} from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Tasks",
      value: "24",
      change: "+2 from last week",
      trend: "up",
      icon: Activity,
      color: "purple"
    },
    {
      title: "Completed",
      value: "18",
      change: "+5 from last week",
      trend: "up",
      icon: CheckCircle2,
      color: "success"
    },
    {
      title: "Pending",
      value: "6",
      change: "-3 from last week",
      trend: "down",
      icon: Clock,
      color: "warning"
    },
    {
      title: "Messages",
      value: "12",
      change: "+1 new message",
      trend: "up",
      icon: MessageSquare,
      color: "info"
    }
  ]

  const recentActivities = [
    {
      title: "Task completed: Review project proposal",
      time: "2 hours ago",
      color: "purple",
      type: "completion"
    },
    {
      title: "New message from John Doe",
      time: "4 hours ago",
      color: "success",
      type: "message"
    },
    {
      title: "Meeting scheduled for tomorrow",
      time: "6 hours ago",
      color: "warning",
      type: "schedule"
    },
    {
      title: "Document uploaded: Q4 Report",
      time: "1 day ago",
      color: "info",
      type: "upload"
    },
    {
      title: "Task assigned: Update website",
      time: "2 days ago",
      color: "purple",
      type: "assignment"
    }
  ]

  const quickActions = [
    {
      title: "Create new task",
      description: "Add a new task to your workflow",
      icon: Plus,
      color: "bg-gradient-to-br from-[#9181BC] to-[#7B68A8]"
    },
    {
      title: "Schedule meeting",
      description: "Set up a new meeting",
      icon: Calendar,
      color: "bg-gradient-to-br from-[#9181BC] to-[#A093C7]"
    },
    {
      title: "Send message",
      description: "Send a quick message",
      icon: Send,
      color: "bg-gradient-to-br from-[#8470B5] to-[#9181BC]"
    },
    {
      title: "Upload document",
      description: "Upload and share documents",
      icon: Upload,
      color: "bg-gradient-to-br from-[#A696CE] to-[#9181BC]"
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      purple: {
        bg: "bg-[#9181BC]/10",
        text: "text-[#9181BC]",
        accent: "text-[#7B68A8]",
        border: "border-[#9181BC]/20"
      },
      success: {
        bg: "bg-emerald-50",
        text: "text-emerald-600",
        accent: "text-emerald-800",
        border: "border-emerald-200"
      },
      warning: {
        bg: "bg-[#F3E7DA]/60",
        text: "text-amber-700",
        accent: "text-amber-800",
        border: "border-[#F3E7DA]"
      },
      info: {
        bg: "bg-slate-50",
        text: "text-slate-600",
        accent: "text-slate-800",
        border: "border-slate-200"
      }
    }
    return colors[color as keyof typeof colors] || colors.purple
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-[#F3E7DA]/30 via-white to-[#9181BC]/5 font-['Montserrat']">
        {/* Welcome Header */}
        <div className="mb-8 px-6 py-8 bg-white/70 backdrop-blur-sm border-b border-[#F3E7DA]/50">
          <h1 className="text-3xl font-semibold text-black mb-2">Welcome back!</h1>
          <p className="text-gray-600 font-normal">Here's what's happening with your projects today.</p>
        </div>

        <div className="px-6">
          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              const colorClasses = getColorClasses(stat.color)
              const TrendIcon = stat.trend === 'up' ? ArrowUp : ArrowDown
              
              return (
                <Card 
                  key={index} 
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 ${colorClasses.border} bg-white/80 backdrop-blur-sm group`}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                    <CardTitle className="text-sm font-semibold text-gray-700">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-3 rounded-xl ${colorClasses.bg} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-5 w-5 ${colorClasses.text}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-semibold text-black mb-2">
                      {stat.value}
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendIcon className={`h-4 w-4 ${stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`} />
                      <p className={`text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                        {stat.change}
                      </p>
                    </div>
                  </CardContent>
                  {/* Decorative accent */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1.5 ${colorClasses.bg}`}></div>
                </Card>
              )
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7 mb-8">
            {/* Recent Activity */}
            <Card className="col-span-4 border-2 border-[#F3E7DA]/50 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4 border-b border-[#F3E7DA]/30">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-[#9181BC]/10 rounded-xl">
                    <Activity className="h-6 w-6 text-[#9181BC]" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold text-black">Recent Activity</CardTitle>
                    <CardDescription className="text-gray-600 font-normal">Your recent tasks and activities</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-[#F3E7DA]/20 transition-colors duration-200 cursor-pointer border border-transparent hover:border-[#9181BC]/20">
                    <div className={`w-3 h-3 rounded-full mt-2 bg-[#9181BC] flex-shrink-0 group-hover:scale-125 transition-transform duration-200`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-black group-hover:text-[#7B68A8] transition-colors">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 font-normal">
                        {activity.time}
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <TrendingUp className="h-4 w-4 text-[#9181BC]" />
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t border-[#F3E7DA]/30">
                  <button className="text-sm text-[#9181BC] hover:text-[#7B68A8] font-semibold transition-colors flex items-center gap-2">
                    View all activities 
                    <ArrowUp className="h-4 w-4 rotate-45" />
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="col-span-3 border-2 border-[#F3E7DA]/50 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4 border-b border-[#F3E7DA]/30">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-[#9181BC]/10 rounded-xl">
                    <Plus className="h-6 w-6 text-[#9181BC]" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold text-black">Quick Actions</CardTitle>
                    <CardDescription className="text-gray-600 font-normal">Frequently used actions</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <button 
                      key={index}
                      className="group w-full text-left p-4 rounded-xl border-2 border-[#F3E7DA]/30 hover:border-[#9181BC]/30 bg-white/70 hover:bg-[#F3E7DA]/10 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl ${action.color} text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-black group-hover:text-[#7B68A8] transition-colors">
                            {action.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 font-normal">
                            {action.description}
                          </p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowUp className="h-5 w-5 text-[#9181BC] rotate-45" />
                        </div>
                      </div>
                    </button>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Additional Content Section */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card className="border-2 border-[#F3E7DA]/50 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-[#9181BC]/10 rounded-full mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-8 w-8 text-[#9181BC]" />
                </div>
                <CardTitle className="text-lg font-semibold text-black">Performance</CardTitle>
                <CardDescription className="text-gray-600 font-normal">Track your progress</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-[#F3E7DA]/50 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-[#9181BC]/10 rounded-full mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-8 w-8 text-[#9181BC]" />
                </div>
                <CardTitle className="text-lg font-semibold text-black">Schedule</CardTitle>
                <CardDescription className="text-gray-600 font-normal">Manage your time</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-[#F3E7DA]/50 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-[#9181BC]/10 rounded-full mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="h-8 w-8 text-[#9181BC]" />
                </div>
                <CardTitle className="text-lg font-semibold text-black">Communication</CardTitle>
                <CardDescription className="text-gray-600 font-normal">Stay connected</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}