import { Agency, DeltaTravelAgencyResponse } from '../model/agency';
import { DeltaTravelDBContext } from '../model/context';
import { DeltaTravelPassengerResponse } from '../model/person';
import { DeltaTravelTripResponse } from '../model/trip';
import { flatten } from './utils';

export async function selectSimple() {
  console.log(`Running ${selectSimple.name}`);
  const context = new DeltaTravelDBContext();

  const res = await context.agencies
    .select(a => ({
      agencyName: a.name,
      agencyPhone: a.phone,
      agencyEmail: a.email
    }))
    .toList();

  context.dispose();

  console.table(res);
}

export async function selectWithArray() {
  console.log(`Running ${selectWithArray.name}`);
  const context = new DeltaTravelDBContext();

  const res = await context.agencies
    .include(a => a.trips)
    .select(a => ({
      agencyName: a.name,
      agencyPhone: a.phone,
      agencyEmail: a.email,
      agencyTrips: a.trips.map(t => ({
        departure: t.departureDate,
        arrival: t.estimatedArrivalDate
      }))
    }))
    .toList();

  context.dispose();

  console.table(res);
  console.log('agencyTrips: ');
  const flattenedTrips = flatten(res.map(r => r.agencyTrips));
  console.table(flattenedTrips);
}

export async function selectWithObjectInstanciation() {
  console.log(`Running ${selectWithArray.name}`);
  const context = new DeltaTravelDBContext();

  const res = await context.agencies
    .include(a => a.trips)
    .thenInclude(t => t.passengers)
    .select(
      a =>
        new DeltaTravelAgencyResponse(
          a.name,
          a.phone,
          a.email,
          a.trips.map(
            t =>
              new DeltaTravelTripResponse(
                t.departureDate,
                t.estimatedArrivalDate,
                t.passengers.map(
                  p =>
                    new DeltaTravelPassengerResponse(
                      p.lastname,
                      p.email,
                      p.phone,
                      p.willTravel
                    )
                )
              )
          )
        )
    )
    .toList();

  context.dispose();

  console.table({
    'result is instance of DeltaTravelAgencyResponse[]':
      res[10] instanceof DeltaTravelAgencyResponse
  });
  console.table(res);
  console.log('agencyTrips: ');
  const flattenedTrips: DeltaTravelTripResponse[] = flatten(
    res.map(r => r.agencyTrips)
  );
  console.table({
    'agencyTrips are instances of DeltaTravelTripResponse':
      flattenedTrips[0] instanceof DeltaTravelTripResponse
  });
  console.table(flattenedTrips);
  console.log('passengers: ');
  const flattenedPassengers: DeltaTravelPassengerResponse[] = flatten(
    flattenedTrips.map(r => r.passengers)
  );
  console.table({
    'passengers are instances of DeltaTravelPassengerResponse':
      flattenedPassengers[0] instanceof DeltaTravelPassengerResponse
  });
  console.table(flattenedPassengers);
}

selectSimple();
selectWithArray();
selectWithObjectInstanciation();
