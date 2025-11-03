// import whis from 'whis';

// whis('jolle.io').then((data) => console.log(data));
import { getRaw } from 'whis';

try {
  const data = await getRaw('google.com'); // this will print the raw WHOIS response
  console.log(data)
} catch (error) {
  
}


// import whis from 'whis';

// whis('intranet-service.corporation', 'internal-whois.com').then((data) =>
//   console.log(data)
// ); // this will use the WHOIS server in "internal-whois.com" to get the data about `intranet-service.corporation`.

// import whois from 'whois';
// whois.lookup('theraptly.com', function (err, data) {
//   console.log(data);
// });
