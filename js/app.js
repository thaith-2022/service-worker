if ("serviceWorker" in navigator) {
  console.log("appp");

  navigator.serviceWorker
    .register("./sw.js")
    .then(function(registration) {
      console.log("registration", registration);
      registration.installing; // the installing worker, or undefined
      registration.waiting; // the waiting worker, or undefined
      registration.active; // the active worker, or undefined
    })
    .catch(function(error) {
      console.log("Service worker registration failed, error:", error);
    });

  // navigator.serviceWorker
  //   .getRegistrations()
  //   .then(function(registrations) {
  //     console.log(1111, registrations);
  //     for (let registration of registrations) {
  //       registration.unregister();
  //     }
  //   })
  //   .catch(function(err) {
  //     console.log("Service Worker registration failed: ", err);
  //   });
}
