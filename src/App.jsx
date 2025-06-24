// src/App.jsx
import Profile from './components/Profile';
import LinkButton from './components/LinkButton';
import Iridescence from './components/Iridescence';
import GlassBox from './components/GlassBox';
import { userData, links } from './utils/data';

function App() {
  return (
    <div className="min-h-screen w-full">
      <Iridescence
        mouseReact={true}
        amplitude={0.1}
        speed={1.0}
      />
      <div className="min-h-screen w-full flex flex-col items-center py-8 px-4 relative z-10 text-white">
        <div className="w-full max-w-2xl mx-auto">
          <GlassBox className="p-8">
            <Profile 
              avatar={userData.avatar}
              name={userData.name}
              bio={userData.bio}
            />
          </GlassBox>
          
          <div className="mt-10 space-y-3">
            {links.map((link, index) => (
              <GlassBox key={index} className="p-2" isLink={true}>
                <LinkButton
                  url={link.url}
                  title={link.title}
                  icon={link.icon}
                />
              </GlassBox>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;