const particleCount = 30; // количество пузырьков
const container = document.createElement("div");
container.className = "particles-container";
document.body.appendChild(container);

for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement("div");
  particle.className = "particle";

  // случайная позиция по X
  particle.style.left = Math.random() * 100 + "vw";
  // случайная скорость
  particle.style.animationDuration = 5 + Math.random() * 10 + "s";
  // случайный размер
  const size = 5 + Math.random() * 15;
  particle.style.width = size + "px";
  particle.style.height = size + "px";

  container.appendChild(particle);
}
