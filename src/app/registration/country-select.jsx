import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { filterCountries } from "./helpers";
  import countryRegionData from "country-region-data/dist/data-umd";
  import { useEffect, useState } from "react";
  
  function CountrySelect({
    priorityOptions = [],
    whitelist = [],
    blacklist = [],
    onChange = () => {},
    className,
    placeholder = "Country",
  }) {
    const [countries, setCountries] = useState([]);
  
    useEffect(() => {
      setCountries(
        filterCountries(countryRegionData, priorityOptions, whitelist, blacklist),
      );
    }, []);
  
    return (
      <Select
        onValueChange={(value) => {
          onChange(value);
        }}
      >
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {countries.map(({ countryName, countryShortCode }) => (
            <SelectItem key={countryShortCode} value={countryShortCode}>
              {countryName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
  
  export default CountrySelect;