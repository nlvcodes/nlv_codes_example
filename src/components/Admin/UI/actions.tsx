"use client"

export const alertAction = () => {
  return <button onClick={() => alert(`I'm an action`)}>
    This is an action
  </button>
}