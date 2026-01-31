const number = -1

export default [
  ...Array(100).fill(0).map((_, i) => ({
    question: `${i+1} -> A question for class 10. The answer is C.`,
    options: [
      "A", "B", "C", "D"
    ],
    answer: 3
  }))
]
