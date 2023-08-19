export function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getActiveIndex(steps) {
  const activeIndex = steps.findIndex((step) => step.active == true);

  if (activeIndex !== -1) {
    return activeIndex;
  }

  return 0;
}

export function handleNext(steps, setActiveStep) {
  let copySteps = [...steps];
  const activeIndex = getActiveIndex(steps);
  const nextIndex = activeIndex + 1;

  if (nextIndex < steps.length) {
    copySteps[activeIndex].active = false;
    copySteps[activeIndex].completed = true;

    copySteps[nextIndex].active = true;
    copySteps[nextIndex].completed = false;
    setActiveStep(copySteps);
  }
}

export function handleBack(steps, setActiveStep) {
  let copySteps = [...steps];
  const activeIndex = getActiveIndex(steps);
  const prevIndex = activeIndex - 1;

  if (prevIndex >= 0) {
    steps[activeIndex].active = false;
    steps[activeIndex].completed = false;

    steps[prevIndex].active = true;
    steps[prevIndex].completed = false;
    setActiveStep(copySteps);
  }
}
