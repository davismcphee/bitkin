const backgroundColors = [
  { color: '#4D86FF' },
  { color: '#8080FF' },
  { color: '#2CB574' },
  { color: '#A51E7C' },
  { color: '#FF78B7' },
  { color: '#F0A500' },
  { color: '#FF752D' },
  { color: '#7090B5' },
];

const bodyColors = [
  { color: 'gold' },
  { color: 'bisque' },
  { color: 'peachpuff' },
  { color: 'burlywood' },
  { color: 'sandybrown' },
  { color: 'peru' },
  { color: 'sienna' },
  { color: 'saddlebrown' }
];

const hatColors = [
  { color: 'black' },
  { color: 'darkgray' },
  { color: 'lightgrey' },
  { color: 'crimson' },
  { color: 'darkblue' },
  { color: 'teal' }
];

function registerSettings(props) {
  return (
    <Page>
      <Section
        title="Display"
      >
        <Select
          label="Show Seconds"
          settingsKey="showSeconds"
          options={[
            { name: 'No', value: false },
            { name: 'Yes', value: true }
          ]}
        />
      </Section>
      
      <Section
        title="Details"
      >
        <TextInput
          label="Bitkin Name"
          settingsKey="bitkinName"
        />
      </Section>
      
      <Section
        title="Appearance"
      >
        <Text>Room Color</Text>
                          
        <ColorSelect
          settingsKey='colorBackground'
          colors={backgroundColors}
        />
        
        <Text>Bitkin Color</Text>
                          
        <ColorSelect
          settingsKey='colorBitkin'
          colors={bodyColors}
        />
        
        <Select
          label="Mouth"
          settingsKey="mouthSelection"
          options={[
            { name: 'Cat', value: 'mouth-cat' },
            { name: 'Smile', value: 'mouth-smile' },
            { name: 'Open', value: 'mouth-open' }
          ]}
        />
      </Section>
      
      <Section
        title="Accessories"
      >
        <Select
          label="Hat"
          settingsKey="hatSelection"
          options={[
            { name: 'None', value: 'none' },
            { name: 'Top Hat', value: 'hat-top-hat' },
            { name: 'Baseball Cap', value: 'hat-baseball-cap' },
            { name: 'Beanie', value: 'hat-beanie' },
            { name: 'Headband', value: 'hat-headband' }
          ]}
        />
        
        <Text>Hat Primary Color</Text>
        
        <ColorSelect
          settingsKey='hatPrimaryColor'
          colors={hatColors}
        />
        
        <Text>Hat Secondary Color</Text>
        
        <ColorSelect
          settingsKey='hatSecondaryColor'
          colors={hatColors}
        />
        
        <Select
          label="Glasses"
          settingsKey="glassesSelection"
          options={[
            { name: 'None', value: 'none' },
            { name: 'Round Glasses', value: 'glasses-round' },
            { name: 'Round Sunglasses', value: 'glasses-round-sun' },
            { name: 'Square Glasses', value: 'glasses-square' },
            { name: 'Square Sunglasses', value: 'glasses-square-sun' },
            { name: 'Rectangle Glasses', value: 'glasses-rectangle' },
            { name: 'Rectangle Sunglasses', value: 'glasses-rectangle-sun' }
          ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(registerSettings);