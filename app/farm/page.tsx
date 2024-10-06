'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Cloud, Droplets, Sun, Thermometer, Wind } from 'lucide-react';

import { frontendUrl } from '@/utils/appConstants';

const FarmPage = () => {
  const [farmData, setFarmData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getFarmData = async () => {
    try {
      const response = await fetch(`${frontendUrl}/api/farm/get-farm`);

      if (response.ok) {
        const data = await response.json();
        setFarmData(data);
      }
    } catch (error) {
      console.error('Error fetching farm data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFarmData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const farmDataResponse = farmData?.data;
  const weatherDataResponse = farmData?.data?.weather;
  console.log('Weather data:', weatherDataResponse);

  const weatherData = [
    {
      day: weatherDataResponse[0].day_name,
      temp: weatherDataResponse[0].average_temperature,
      humidity: weatherDataResponse[0].average_humidity,
      wind: weatherDataResponse[0].average_wind_speed,
      condition: weatherDataResponse[0].weather_symbol,
    },
    {
      day: weatherDataResponse[1].day_name,
      temp: weatherDataResponse[1].average_temperature,
      humidity: weatherDataResponse[1].average_humidity,
      wind: weatherDataResponse[1].average_wind_speed,
      condition: weatherDataResponse[1].weather_symbol,
    },
    {
      day: weatherDataResponse[2].day_name,
      temp: weatherDataResponse[2].average_temperature,
      humidity: weatherDataResponse[2].average_humidity,
      wind: weatherDataResponse[2].average_wind_speed,
      condition: weatherDataResponse[2].weather_symbol,
    },
    {
      day: weatherDataResponse[3].day_name,
      temp: weatherDataResponse[3].average_temperature,
      humidity: weatherDataResponse[3].average_humidity,
      wind: weatherDataResponse[3].average_wind_speed,
      condition: weatherDataResponse[3].weather_symbol,
    },
    {
      day: weatherDataResponse[4].day_name,
      temp: weatherDataResponse[4].average_temperature,
      humidity: weatherDataResponse[4].average_humidity,
      wind: weatherDataResponse[4].average_wind_speed,
      condition: weatherDataResponse[4].weather_symbol,
    },
    {
      day: weatherDataResponse[5].day_name,
      temp: weatherDataResponse[5].average_temperature,
      humidity: weatherDataResponse[5].average_humidity,
      wind: weatherDataResponse[5].average_wind_speed,
      condition: weatherDataResponse[5].weather_symbol,
    },
    {
      day: weatherDataResponse[6].day_name,
      temp: weatherDataResponse[6].average_temperature,
      humidity: weatherDataResponse[6].average_humidity,
      wind: weatherDataResponse[6].average_wind_speed,
      condition: weatherDataResponse[6].weather_symbol,
    },
  ];

  const showField = () => {
    window.open('https://api.nasa.gov/planetary/earth/imagery?lat=41.0574465&lon=29.0168925&api_key=HQsRM9CQ3a3MzBtxuzycB9oZa0tfuZhj90M8sUgY&', '_blank');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        <h1 className="text-3xl font-bold mb-6">
          {farmDataResponse.name} ({farmDataResponse.area}m2)
        </h1>
        <button className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded" onClick={showField}>
          See your field Landsat 8 image
        </button>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>7 Days Weather Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="weather" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="weather">Weather</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="weather">
              <div className="grid grid-cols-7 gap-4 mt-4">
                {weatherData.map((day, index) => (
                  <Card key={index} className="text-center">
                    <CardHeader className="p-2">
                      <CardTitle className="text-sm">{day.day}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2">
                      {day.condition === 1 && <Sun className="w-8 h-8 mx-auto mb-2" />}
                      {day.condition === 2 && <Cloud className="w-8 h-8 mx-auto mb-2" />}
                      {day.condition === 8 && <Droplets className="w-8 h-8 mx-auto mb-2" />}
                      <p className="text-lg font-bold">{day.temp}°C</p>
                      <p className="text-xs">{day.condition === 1 ? 'Sun' : day.condition === 2 ? 'Clouds' : day.condition === 8 ? 'Rain' : 'Unknown'}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="details">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {weatherData.map((day, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{day.day}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center">
                          <Thermometer className="w-4 h-4 mr-2" />
                          <span>{day.temp}°C</span>
                        </div>
                        <div className="flex items-center">
                          <Droplets className="w-4 h-4 mr-2" />
                          <span>{day.humidity}%</span>
                        </div>
                        <div className="flex items-center">
                          <Wind className="w-4 h-4 mr-2" />
                          <span>{day.wind} km/s</span>
                        </div>
                        <div className="flex items-center">
                          <Cloud className="w-4 h-4 mr-2" />
                          <span>{day.condition === 1 ? 'Sun' : day.condition === 2 ? 'Clouds' : day.condition === 8 ? 'Rain' : 'Unknown'}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmPage;
