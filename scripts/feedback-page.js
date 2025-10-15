const stars = document.querySelectorAll(".star")
let selectedRating = 0

const highlightStars = function (upTo) {
  stars.forEach((s, i) => {
    if (i < upTo) {
      s.classList.add("active")
    } else s.classList.remove("active")
  })
}

stars.forEach((star, index) => {
  const starValue = index + 1

  star.addEventListener("mouseover", () => highlightStars(starValue))
  star.addEventListener("mouseout", () => highlightStars(selectedRating))
  star.addEventListener("click", () => {
    selectedRating = starValue
    highlightStars(selectedRating)
  })
})
