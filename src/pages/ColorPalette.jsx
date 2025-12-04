import React, { useState } from 'react';

const ColorPalette = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Define all CSS variables from your theme
  const colorVariables = [
    { name: '--background', description: 'Main background color' },
    { name: '--foreground', description: 'Main text color' },
    { name: '--card', description: 'Card background color' },
    { name: '--card-foreground', description: 'Card text color' },
    { name: '--popover', description: 'Popover background color' },
    { name: '--popover-foreground', description: 'Popover text color' },
    { name: '--primary', description: 'Primary brand color' },
    { name: '--primary-foreground', description: 'Text on primary color' },
    { name: '--secondary', description: 'Secondary color' },
    { name: '--secondary-foreground', description: 'Text on secondary color' },
    { name: '--muted', description: 'Muted background color' },
    { name: '--muted-foreground', description: 'Muted text color' },
    { name: '--accent', description: 'Accent color' },
    { name: '--accent-foreground', description: 'Text on accent color' },
    { name: '--destructive', description: 'Error/destructive color' },
    { name: '--destructive-foreground', description: 'Text on destructive color' },
    { name: '--border', description: 'Border color' },
    { name: '--input', description: 'Input field color' },
    { name: '--ring', description: 'Focus ring color' },
    { name: '--chart-1', description: 'Chart color 1' },
    { name: '--chart-2', description: 'Chart color 2' },
    { name: '--chart-3', description: 'Chart color 3' },
    { name: '--chart_4', description: 'Chart color 4' },
    { name: '--chart-5', description: 'Chart color 5' },
  ];

  const getColorValue = (varName) => {
    const computedStyle = getComputedStyle(document.documentElement);
    return computedStyle.getPropertyValue(varName).trim();
  };

  const getHslValues = (varName) => {
    const value = getColorValue(varName);
    return value || 'Not set';
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      {/* Toggle Theme Button */}
      <div className="flex justify-between items-center mb-8 p-4 rounded-lg bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
        <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">
          Color Palette Showcase
        </h1>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="px-4 py-2 rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90 transition-opacity"
        >
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>

      {/* Info Box */}
      <div className="mb-8 p-4 rounded-lg bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
        <p className="font-medium">Current Theme: {isDarkMode ? 'Dark' : 'Light'}</p>
        <p className="text-sm mt-1">Click on any color box to copy the CSS variable name</p>
      </div>

      {/* Color Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {colorVariables.map((color) => {
          const hslValue = getHslValues(color.name);
          const isChartColor = color.name.includes('chart');
          
          return (
            <div
              key={color.name}
              className={`rounded-xl p-4 border border-[hsl(var(--border))] bg-[hsl(var(--card))] transition-transform hover:scale-[1.02] ${
                isChartColor ? 'col-span-1' : ''
              }`}
            >
              {/* Color Preview */}
              <div
                onClick={() => copyToClipboard(color.name)}
                className={`h-32 rounded-lg mb-4 cursor-pointer transition-all hover:shadow-lg border-2 border-[hsl(var(--border))] flex items-center justify-center`}
                style={{ 
                  backgroundColor: `hsl(${hslValue})`,
                  color: color.name.includes('foreground') || 
                         color.name === '--primary-foreground' || 
                         color.name === '--accent-foreground' || 
                         color.name === '--destructive-foreground'
                    ? 'hsl(var(--background))'
                    : 'hsl(var(--foreground))'
                }}
              >
                <span className="text-sm font-medium px-2 py-1 rounded bg-white/20 backdrop-blur-sm">
                  Click to copy
                </span>
              </div>

              {/* Color Info */}
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-[hsl(var(--foreground))]">
                    {color.name.replace('--', '')}
                  </h3>
                  <span className="text-xs px-2 py-1 rounded bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
                    {isChartColor ? 'Chart' : 'Theme'}
                  </span>
                </div>
                
                <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
                  {color.description}
                </p>

                {/* Color Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-[hsl(var(--muted-foreground))]">CSS Variable:</span>
                    <code 
                      onClick={() => copyToClipboard(color.name)}
                      className="bg-[hsl(var(--muted))] px-2 py-1 rounded cursor-pointer hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] transition-colors"
                    >
                      {color.name}
                    </code>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-[hsl(var(--muted-foreground))]">HSL Value:</span>
                    <code className="bg-[hsl(var(--muted))] px-2 py-1 rounded">
                      {hslValue}
                    </code>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[hsl(var(--muted-foreground))]">Usage:</span>
                    <code 
                      onClick={() => copyToClipboard(`hsl(${hslValue})`)}
                      className="bg-[hsl(var(--muted))] px-2 py-1 rounded cursor-pointer hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] transition-colors truncate max-w-[200px]"
                      title={`hsl(${hslValue})`}
                    >
                      hsl({hslValue})
                    </code>
                  </div>
                </div>

                {/* Example Usage */}
                <div className="mt-4 pt-4 border-t border-[hsl(var(--border))]">
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">Example usage:</p>
                  <code className="text-xs block p-2 rounded bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
                    background-color: hsl(var({color.name}));
                  </code>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Usage Examples Section */}
      <div className="mt-12 p-6 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
        <h2 className="text-xl font-bold text-[hsl(var(--foreground))] mb-4">
          Usage Examples
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Example 1: Button */}
          <div className="p-4 rounded-lg bg-[hsl(var(--muted))]">
            <h3 className="font-bold text-[hsl(var(--foreground))] mb-2">Button Component</h3>
            <button className="px-4 py-2 rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90 transition-opacity">
              Primary Button
            </button>
            <code className="block mt-2 text-xs p-2 rounded bg-black/5">
              background-color: hsl(var(--primary));<br/>
              color: hsl(var(--primary-foreground));
            </code>
          </div>

          {/* Example 2: Card */}
          <div className="p-4 rounded-lg border border-[hsl(var(--border))]">
            <h3 className="font-bold text-[hsl(var(--foreground))] mb-2">Card Component</h3>
            <div className="p-4 rounded-lg bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))]">
              This is a card with theme colors
            </div>
            <code className="block mt-2 text-xs p-2 rounded bg-black/5">
              background-color: hsl(var(--card));<br/>
              color: hsl(var(--card-foreground));
            </code>
          </div>

          {/* Example 3: Input */}
          <div className="p-4 rounded-lg bg-[hsl(var(--muted))]">
            <h3 className="font-bold text-[hsl(var(--foreground))] mb-2">Input Field</h3>
            <input 
              type="text" 
              placeholder="Type something..."
              className="w-full px-3 py-2 rounded border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
            />
            <code className="block mt-2 text-xs p-2 rounded bg-black/5">
              border-color: hsl(var(--input));<br/>
              background-color: hsl(var(--background));
            </code>
          </div>

          {/* Example 4: Alert */}
          <div className="p-4 rounded-lg bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))]">
            <h3 className="font-bold mb-2">Destructive Alert</h3>
            <p>This is an error message</p>
            <code className="block mt-2 text-xs p-2 rounded bg-white/20">
              background-color: hsl(var(--destructive));<br/>
              color: hsl(var(--destructive-foreground));
            </code>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-[hsl(var(--border))] text-center text-[hsl(var(--muted-foreground))] text-sm">
        <p>Total Colors: {colorVariables.length} | Theme: {isDarkMode ? 'Dark' : 'Light'}</p>
        <p className="mt-1">All colors are defined as CSS custom properties in :root and .dark</p>
      </div>
    </div>
  );
};

export default ColorPalette;