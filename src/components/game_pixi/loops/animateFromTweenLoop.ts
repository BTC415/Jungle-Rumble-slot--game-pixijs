import { lerp, allTweenings } from "../../../utils/urls";
export function animateFromTweenLoop() {
  const now = Date.now();
  const remove = [];
  for (let i = 0; i < allTweenings.length; i++) {
    const t = allTweenings[i];
    if (!t.flow && now - t.start > 7000) {
      t.time = now - t.start + 1000 + i * 500
    }
    const phase = Math.min(1, (now - t.start) / t.time);
    (t.object as any)[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
    if (t.change) t.change(t);
    if (phase === 1) {
      (t.object as any)[t.property] = t.target;
      if (t.complete) t.complete(t);
      remove.push(t);
    }
  }
  for (let i = 0; i < remove.length; i++) {
    allTweenings.splice(allTweenings.indexOf(remove[i]), 1);
  }
};
