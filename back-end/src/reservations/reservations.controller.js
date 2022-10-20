/**
 * List handler for reservation resources
 */
const reservationService = require("./reservations.service")

async function list(req, res) {
  const data = await reservationService.list(req.query.date)
  res.json({ data })
}

// async function listByDate(req, res) {
//   const data = await reservationService.listByDate(req.params.date)
//   res.json({ data })
// }

module.exports = {
  list,
};
