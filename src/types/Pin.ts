import z from 'zod'

const ConnectorSchema = z.object({
  type: z.union([
    z.literal('Type 2'),
    z.literal(' Type 3'),
    z.literal('J1772'),
    z.literal('CCS 2'),
  ]),
  status: z.union([z.literal('available'), z.literal('unavailable')]),
})

const PinSchema = z.object({
  _id: z.string(),
  title: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  connectors: z.array(ConnectorSchema),
})

export type PinT = z.TypeOf<typeof PinSchema>
