// Tweaks panel — shared across all pages
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#c4b0ff",
  "grain": false,
  "motion": true,
  "hero_theme": "indigo",
  "shots": true
}/*EDITMODE-END*/;

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const hasShots = typeof document !== 'undefined' && !!document.getElementById('shots-section');

  React.useEffect(() => {
    document.documentElement.style.setProperty('--accent', t.accent);
    document.body.setAttribute('data-grain', t.grain ? 'on' : 'off');
    document.body.setAttribute('data-motion', t.motion ? 'on' : 'off');
    document.body.setAttribute('data-hero-theme', t.hero_theme);
    document.body.setAttribute('data-shots', t.shots ? 'on' : 'off');
  }, [t.accent, t.grain, t.motion, t.hero_theme, t.shots]);

  return (
    <TweaksPanel>
      <TweakSection label="Theme"></TweakSection>
      <TweakColor label="Accent" value={t.accent}
        options={['#c4b0ff', '#9d7bff', '#7d5bdf', '#f2a6c8', '#ff5440']}
        onChange={(v) => setTweak('accent', v)}></TweakColor>
      <TweakRadio label="Hero theme" value={t.hero_theme}
        options={['indigo', 'sunset', 'mint', 'noir']}
        onChange={(v) => setTweak('hero_theme', v)}></TweakRadio>
      <TweakSection label="Texture & motion"></TweakSection>
      <TweakToggle label="Film grain" value={t.grain}
        onChange={(v) => setTweak('grain', v)}></TweakToggle>
      <TweakToggle label="Scroll animations" value={t.motion}
        onChange={(v) => setTweak('motion', v)}></TweakToggle>
      {hasShots ? (
        <React.Fragment>
          <TweakSection label="Sections"></TweakSection>
          <TweakToggle label="Work shots grid" value={t.shots}
            onChange={(v) => setTweak('shots', v)}></TweakToggle>
        </React.Fragment>
      ) : null}
    </TweaksPanel>
  );
}

const tweaksRoot = document.createElement('div');
document.body.appendChild(tweaksRoot);
ReactDOM.createRoot(tweaksRoot).render(<TweaksApp></TweaksApp>);
