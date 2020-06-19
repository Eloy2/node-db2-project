
exports.seed = function(knex) {
  // Deletes ALL existing entries
  // I added truncate because it deletes and resets the autoincrementing ID
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {id: 1, vin: "1C3CDZBG8DN504146", make: "Acura", model: "Vigor", mileage: 987521, transmissionType: "auto", statusOfTitle: "clean"},
        {id: 2, vin: "JH4KA8271NC000480", make: "Toyota", model: "Scion Xd", mileage: 745201, transmissionType: "auto", statusOfTitle: "clean"},
        {id: 3, vin: "1G2NE55D5SM534479", make: "Kia", model: "Sorento", mileage: 578521, transmissionType: "auto", statusOfTitle: "clean"}
      ]);
    });
};
