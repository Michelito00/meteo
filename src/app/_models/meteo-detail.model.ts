export interface MeteoDetail {
  cloudcover: string,
  lifted_index: number,
  prec_type: string,
  rh2m: number,
  seeing: number,
  temp2m: number,
  timepoint: number,
  transparency: number,
  icon: string
}

export interface TimeDetail {
  results: {
    sunrise: string,
		sunset: string,
		first_light: string,
		last_light: string,
		dawn: string,
		dusk: string,
		solar_noon: string,
		golden_hour: string,
		day_length: string,
		timezone: string
  },
  status: string
}
