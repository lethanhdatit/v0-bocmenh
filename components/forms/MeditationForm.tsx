"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

interface MeditationFormProps {
  onSubmit: (data: {
    experience: string
    availableTime: number
    goals: string[]
  }) => void
  isLoading: boolean
}

export default function MeditationForm({ onSubmit, isLoading }: MeditationFormProps) {
  const [experience, setExperience] = useState("")
  const [availableTime, setAvailableTime] = useState([15])
  const [goals, setGoals] = useState<string[]>([])

  const handleGoalChange = (goal: string, checked: boolean) => {
    if (checked) {
      setGoals([...goals, goal])
    } else {
      setGoals(goals.filter((g) => g !== goal))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (experience && goals.length > 0) {
      onSubmit({
        experience,
        availableTime: availableTime[0],
        goals,
      })
    }
  }

  const goalOptions = [
    { id: "stress-relief", label: "Stress Relief", labelVi: "Giảm Căng Thẳng" },
    { id: "focus", label: "Improve Focus", labelVi: "Cải Thiện Tập Trung" },
    { id: "emotional-healing", label: "Emotional Healing", labelVi: "Chữa Lành Cảm Xúc" },
    { id: "spiritual-growth", label: "Spiritual Growth", labelVi: "Phát Triển Tâm Linh" },
    { id: "better-sleep", label: "Better Sleep", labelVi: "Ngủ Ngon Hơn" },
    { id: "self-love", label: "Self-Love", labelVi: "Yêu Thương Bản Thân" },
  ]

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Find Your Perfect Meditation
        </CardTitle>
        <p className="text-gray-600 mt-2">Tìm Kiếm Thiền Định Hoàn Hảo Cho Bạn</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Experience Level */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold text-gray-700">Experience Level / Trình Độ Kinh Nghiệm</Label>
            <RadioGroup value={experience} onValueChange={setExperience}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="beginner" id="beginner" />
                <Label htmlFor="beginner">Beginner / Mới Bắt Đầu</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="intermediate" id="intermediate" />
                <Label htmlFor="intermediate">Intermediate / Trung Cấp</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="advanced" id="advanced" />
                <Label htmlFor="advanced">Advanced / Nâng Cao</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Available Time */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold text-gray-700">
              Available Time: {availableTime[0]} minutes / Thời Gian: {availableTime[0]} phút
            </Label>
            <Slider
              value={availableTime}
              onValueChange={setAvailableTime}
              max={60}
              min={5}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>5 min</span>
              <span>30 min</span>
              <span>60 min</span>
            </div>
          </div>

          {/* Goals */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold text-gray-700">Your Goals / Mục Tiêu Của Bạn</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {goalOptions.map((goal) => (
                <div key={goal.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={goal.id}
                    checked={goals.includes(goal.id)}
                    onCheckedChange={(checked) => handleGoalChange(goal.id, checked as boolean)}
                  />
                  <Label htmlFor={goal.id} className="text-sm">
                    {goal.label} / {goal.labelVi}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            disabled={!experience || goals.length === 0 || isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Finding Meditations... / Đang Tìm Kiếm...</span>
              </div>
            ) : (
              "Get Recommendations / Nhận Gợi Ý"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
