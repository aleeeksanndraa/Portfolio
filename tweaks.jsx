// Tweaks panel — shared across all pages
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#9d7bff",
  "grain": true,
  "motion": true
}/*EDITMODE-END*/;

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--accent', t.accent);
    document.body.setAttribute('data-grain', t.grain ? 'on' : 'off');
    document.body.setAttribute('data-motion', t.motion ? 'on' : 'off');
  }, [t.accent, t.grain, t.motion]);

  return (
    <TweaksPanel>
      <TweakSection label="Theme"></TweakSection>
      <TweakColor label="Accent" value={t.accent}
        options={['#9d7bff', '#c4b0ff', '#7d5bdf', '#f2a6c8']}
        onChange={(v) => setTweak('accent', v)}></TweakColor>
      <TweakSection label="Texture & motion"></TweakSection>
      <TweakToggle label="Film grain" value={t.grain}
        onChange={(v) => setTweak('grain', v)}></TweakToggle>
      <TweakToggle label="Scroll animations" value={t.motion}
        onChange={(v) => setTweak('motion', v)}></TweakToggle>
    </TweaksPanel>
  );
}

const tweaksRoot = document.createElement('div');
document.body.appendChild(tweaksRoot);
ReactDOM.createRoot(tweaksRoot).render(<TweaksApp></TweaksApp>);
