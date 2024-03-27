/** Возвращает число, значение которого ограничено заданным диапазоном
 * @param {Number} value - исходное значение
 * @param {Number} min - минимальная граница диапазона
 * @param {Number} max - максимальная граница диапазона
 */
export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}
