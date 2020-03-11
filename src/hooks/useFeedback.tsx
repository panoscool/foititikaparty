import { useState } from 'react'

function useFeedback(initialState: any) {
  const [state, setState] = useState(initialState);

  function handleFeedback(loading: boolean, error?: string | null) {
    setState({ ...state, loading, error })
  }

  return { state, handleFeedback }
}

export default useFeedback;
