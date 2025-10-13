#!/bin/bash

# Opus-Sonnet Workflow Helper Script

case "$1" in
  plan)
    echo "=== PLANNING MODE WITH OPUS ==="
    echo "Switch to planning mode by telling Claude:"
    echo "\"I want to plan [describe your task]\""
    echo ""
    echo "Claude will:"
    echo "- Analyze requirements thoroughly"
    echo "- Research the codebase"
    echo "- Create detailed implementation plan"
    echo "- Build comprehensive todo list"
    ;;

  execute)
    echo "=== EXECUTION MODE WITH SONNET ==="
    echo "1. First switch model: /model sonnet"
    echo "2. Then tell Claude: \"Execute the plan\""
    echo ""
    echo "Claude will:"
    echo "- Follow the todo list"
    echo "- Implement efficiently"
    echo "- Focus on action over analysis"
    ;;

  workflow)
    echo "=== OPUS-SONNET WORKFLOW ==="
    echo ""
    echo "1. PLAN with Opus (current model):"
    echo "   Tell Claude: \"Plan this task: [description]\""
    echo ""
    echo "2. SWITCH to Sonnet:"
    echo "   Run: /model sonnet"
    echo ""
    echo "3. EXECUTE with Sonnet:"
    echo "   Tell Claude: \"Execute the plan\""
    echo ""
    echo "4. If stuck, switch back:"
    echo "   Run: /model opus"
    echo "   Tell Claude: \"Help me solve [problem]\""
    ;;

  *)
    echo "Usage: ./opus-sonnet-workflow.sh [plan|execute|workflow]"
    echo ""
    echo "Available commands:"
    echo "  plan     - Show planning mode instructions"
    echo "  execute  - Show execution mode instructions"
    echo "  workflow - Show complete workflow guide"
    ;;
esac