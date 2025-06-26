import { BaseEntity } from "./base.entity";

export interface CounterProps {
  id: string;
  value: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Counter extends BaseEntity {
  public readonly value: number;

  constructor(props: CounterProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this.value = props.value;
  }

  public increment(amount: number = 1): Counter {
    return new Counter({
      id: this.id,
      value: this.value + amount,
      createdAt: this.createdAt,
      updatedAt: new Date(),
    });
  }

  public decrement(amount: number = 1): Counter {
    return new Counter({
      id: this.id,
      value: Math.max(0, this.value - amount),
      createdAt: this.createdAt,
      updatedAt: new Date(),
    });
  }

  public reset(): Counter {
    return new Counter({
      id: this.id,
      value: 0,
      createdAt: this.createdAt,
      updatedAt: new Date(),
    });
  }
}
