const groupEventsByScheme = (events) => {
  return [...events.reduce((x, y) => {
    const key = y.partitionKey // this is scheme

    const item = x.get(key) || Object.assign({}, {
      // what properties for each group
      // this is each scheme
      schemeId: y.partitionKey,
      events: []
    })
    item.events.push(y)

    return x.set(key, item)
  }, new Map()).values()]
}

module.exports = {
  groupEventsByScheme
}
