export function dedupe (xs = []) {
  const set = new Set()

  const flattened = xs.flatMap((x) => x)

  return flattened.filter((x) => {
    if (set.has(x.id)) {
      return false
    } else {
      set.add(x.id)
      return true
    }
  })
}

export function diff (lh, rh) {
  lh = dedupe(lh)
  rh = dedupe(rh)

  const added = _diff(lh, rh)
  const removed = _diff(rh, lh)

  return { added, removed }

  function _diff (lh, rh) {
    const orig = new Set()
    const added = new Set()

    for (const l of lh) {
      orig.add(l.id)
    }

    for (const r of rh) {
      if (!orig.has(r.id)) {
        added.add(r.id)
      }
    }

    const unsorted = rh.filter((r) => {
      return added.has(r.id)
    })

    unsorted.sort((a, b) => a.id - b.id)

    return unsorted
  }
}
