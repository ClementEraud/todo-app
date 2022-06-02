/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

export class JwtServiceStub extends JwtService {
  sign(_payload: string | object | Buffer, _options?: JwtSignOptions): string {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhM2EwMDdjYi0wZjI2LTQ0ZjMtYWJlNy05ZjAwNTYyN2I5NGMiLCJ1c2VybmFtZSI6ImNsZW1lbnRlcmF1ZCIsImlhdCI6MTY1NDE2MTk2MCwiZXhwIjoxNjU0MTY1NTYwfQ.Ewb-vlPBHzoKZFqk2WiKVmuPUQegP10YQ0PJl404PFc'
  }
}
