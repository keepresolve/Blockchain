pragma solidity >=0.4.22 <0.9.0;


contract WeatherOracle {
  address public oracleAddress;

  constructor  (address  _oracleAddress)  {
    oracleAddress = _oracleAddress;
  }

  event WeatherUpdate (
    string weatherDescription,
    string temperature,
    string humidity,
    string visibility,
    string windSpeed,
    string windDirection,
    string windGust
  );

  function updateWeather (
    string memory weatherDescription,
    string memory temperature,
    string memory humidity,
    string memory visibility,
    string memory  windSpeed,
    string memory windDirection,
    string memory windGust
  )
  public
  {
    require(msg.sender == oracleAddress);


    emit WeatherUpdate (
      weatherDescription,
      temperature,
      humidity,
      visibility,
      windSpeed,
      windDirection,
      windGust
    );
  }
}
