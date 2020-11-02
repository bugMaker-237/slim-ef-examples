import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Agency } from './agency';
import { DeltaTravelPassengerResponse, Person } from './person';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Agency, c => c.trips)
  agency: Agency;

  @Column()
  agencyId: number;

  @Column()
  departureDate: Date;

  @Column({ nullable: true })
  estimatedArrivalDate: Date;

  @OneToMany(() => Person, p => p.trip)
  passengers: Person[];
}

export class DeltaTravelTripResponse {
  constructor(
    public departure: Date,
    public arrival: Date,
    public passengers: DeltaTravelPassengerResponse[]
  ) {}
}
