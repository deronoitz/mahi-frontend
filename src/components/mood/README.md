# Mood Feature Documentation

## Overview
The mood feature allows users to select their current mood or provide text input about their condition to get personalized food recommendations.

## File Structure

### Constants
- `src/constants/mood.ts` - Contains mood tags, colors, and type definitions

### Components
- `src/components/mood/mood-page-header.tsx` - Header component with title and subtitle
- `src/components/mood/mood-selector.tsx` - Interactive mood tag selection component
- `src/components/mood/chat-input.tsx` - Text input component for user stories
- `src/components/mood/mood-actions.tsx` - Action buttons (chat/continue)
- `src/components/mood/loading-screen.tsx` - Loading screen with animation
- `src/components/mood/index.ts` - Component exports

### Hooks
- `src/hooks/useMoodSelection.ts` - Manages mood selection state and actions
- `src/hooks/useLoadingAnimation.ts` - Handles Lottie animation loading
- `src/hooks/useMoodPageLogic.ts` - Main logic hook combining all functionality

### Utilities
- `src/lib/foodRecommendation.ts` - Food recommendation request handling
- `src/types/mood.ts` - TypeScript type definitions

### Main Page
- `src/app/mood/page.tsx` - Main mood page component

## Usage

The mood page allows users to:
1. Select multiple mood tags that represent their current state
2. Alternatively, write a text description of their condition
3. Submit their selection to get food recommendations

## Key Features

- **Animated UI**: Smooth transitions and micro-interactions
- **Dual Input Mode**: Both tag selection and text input
- **Loading States**: Animated loading screen during processing
- **Type Safety**: Full TypeScript support
- **Clean Architecture**: Separated concerns with hooks and utilities

## Animation Assets

- `public/loading.json` - Lottie animation for loading screen

## Future Enhancements

- Add actual API integration for food recommendations
- Implement mood history tracking
- Add more sophisticated mood analysis
- Enhanced error handling and validation
