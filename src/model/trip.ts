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

  @ManyToOne(() => Agency, c => c.trips, { onDelete: 'CASCADE', cascade: true })
  agency: Agency;

  @Column()
  agencyId: number;

  @Column({ type: 'datetime' })
  departureDate: Date;

  @Column({ nullable: true, type: 'datetime' })
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
