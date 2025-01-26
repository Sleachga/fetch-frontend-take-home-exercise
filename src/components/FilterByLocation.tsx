import { Flex, Text, TextField } from "@radix-ui/themes";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";
import { DropdownMenu } from "radix-ui";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Bounds, LocationResult } from "../types";

const StyledContent = styled(DropdownMenu.Content)`
  min-width: 220px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  width: 80vw;
  max-width: 1200px;
  justify-content: start;
  align-items: start;
  padding: 16px;
  margin-top: 10px;

  @media (max-width: 768px) {
    position: fixed;
    left: 50% !important;
    transform: translateX(-50%) !important;
    width: calc(100% - 32px);
    max-width: 400px;
  }
`;

const SearchContainer = styled(Flex)<{ hasMap: boolean }>`
  width: 100%;
  margin-bottom: ${(props) => (props.hasMap ? "16px" : "0")};
`;

const StyledInput = styled(TextField.Root)`
  background-color: white;
  border: 1px solid var(--gray-5);
  height: 45px;

  &:focus {
    border-color: var(--iris-8);
    box-shadow: 0 0 0 1px var(--iris-8);
  }
`;

const ResultsList = styled(Flex)`
  width: 100%;
  background: white;
  border: 1px solid var(--gray-5);
  margin-top: 4px;
`;

const ResultItem = styled(Flex)`
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--gray-3);
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--gray-5);
  }
`;

interface FilterByLocationProps {
  children: React.ReactNode;
  onBoundsChanged: (bounds: Bounds | null) => void;
}

export const FilterByLocation = ({
  children,
  onBoundsChanged,
}: FilterByLocationProps) => {
  const defaultCenter = { lat: 33.7501, lng: -84.3885 }; // ATLANTA BAY BEE
  const [locationString, setLocationString] = useState("");
  const [searchResults, setSearchResults] = useState<LocationResult[]>([]);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [showResults, setShowResults] = useState(false);
  const [selectedLocation, setSelectedLocation] =
    useState<LocationResult | null>(null);

  const handleBoundsChanged = (event: MapCameraChangedEvent) => {
    const { bounds } = event.detail;
    const { north, south, east, west } = bounds;

    const corners = {
      top_right: { lat: north, lon: west },
      bottom_left: { lat: south, lon: east },
    };

    onBoundsChanged(corners);
  };

  useEffect(() => {
    const fetchLocation = async () => {
      if (locationString.length === 0) {
        setSearchResults([]);
        return;
      }
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${locationString}&key=${
          import.meta.env.VITE_GOOGLE_MAPS_API_KEY
        }`
      );
      const data = await response.json();
      if (data.status === "OK") {
        setSearchResults(data.results);
      }
    };

    const timeoutId = setTimeout(fetchLocation, 300);
    return () => clearTimeout(timeoutId);
  }, [locationString]);

  const handleLocationSelect =
    (result: LocationResult) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setMapCenter(result.geometry.location);
      setLocationString(result.formatted_address);
      setSearchResults([]);
      setSelectedLocation(result);
      setShowResults(false);
    };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setLocationString("");
      setSelectedLocation(null);
      setSearchResults([]);
      setMapCenter(defaultCenter);
      onBoundsChanged(null);
    }
  };

  return (
    <DropdownMenu.Root onOpenChange={handleOpenChange}>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
      <StyledContent align="center" side="bottom">
        <SearchContainer direction="column" gap="2" hasMap={!!selectedLocation}>
          <StyledInput
            placeholder="Enter a location to search for dogs"
            value={locationString}
            onChange={(e) => {
              setLocationString(e.target.value);
              setShowResults(true);
            }}
            onBlur={() => setTimeout(() => setShowResults(false), 100)}
          />
          {searchResults.length > 0 &&
            locationString.length > 0 &&
            showResults && (
              <ResultsList direction="column">
                {searchResults.map((result) => (
                  <ResultItem
                    key={result.formatted_address}
                    onClick={handleLocationSelect(result)}
                  >
                    <Text size="2">{result.formatted_address}</Text>
                  </ResultItem>
                ))}
              </ResultsList>
            )}
        </SearchContainer>
        {selectedLocation && (
          <Flex
            direction="column"
            gap="4"
            width="100%"
            height="500px"
            justify="center"
            align="center"
          >
            <APIProvider
              apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""}
            >
              <Map
                mapId="sanfords-map"
                center={mapCenter}
                defaultZoom={10}
                onBoundsChanged={handleBoundsChanged}
              >
                <AdvancedMarker position={mapCenter} />
              </Map>
            </APIProvider>
          </Flex>
        )}
      </StyledContent>
    </DropdownMenu.Root>
  );
};
