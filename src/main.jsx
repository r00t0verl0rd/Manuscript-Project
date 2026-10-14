import React, { useEffect, useMemo, useState } from 'react';
import CosmicStarfield from './CosmicStarfield.jsx';
import BotanicalGarden from './BotanicalGarden.jsx';
import { createRoot } from 'react-dom/client';
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import { ideas, navigationItems, roadmapStages, partners, sortedIdeas, shortenId, dateLabel } from './data.js';
import '../styles.css';
import '../partners.css';
import '../solar-biopunk.css';
import './react-polish.css';

const catalogs = { ru, en };
const initialLanguage = (navigator.language || navigator.languages?.[0] || '').toLowerCase().startsWith('ru') ? 'ru' : 'en';
const VoteIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3L4 11H9V21H15V11H20L12 3Z" /></svg>;
const ArrowIcon = () => <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M8 20h24M22 10l10 10-10 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;


function Biosphere() {
  return <div className="biosphere" aria-hidden="true">
    <div className="cosmic-nebula"/>
    <CosmicStarfield/>
    <div className="biosphere__sun"/><BotanicalGarden/>
    <div className="react-atmosphere"/>
  </div>;
}

function Header({ t, language, setLanguage, activePanel, navigate }) {
  const menu = navigationItems.filter(item => item.buttonId !== 'meme-part-btn');
  return <header className="header-container">
    <div className="header-row-top">
      <div id="about-mini-section">
        {menu.map(item => <button key={item.buttonId} type="button" id={item.buttonId} className="simple-btn" onClick={()=>navigate(item.panelId)}>{t(activePanel === item.panelId ? 'about_back_btn' : item.buttonId === 'more-btn' ? 'more_btn' : item.buttonId === 'contacts-btn' ? 'contacts_btn' : 'road_map_btn')}</button>)}
      </div>
      <button type="button" id="lang-toggle" className="lang-flag-btn" aria-label={t('switch_language')} onClick={()=>setLanguage(v=>v==='ru'?'en':'ru')}>{language==='ru'?'🇬🇧':'🇷🇺'}</button>
    </div>
    <div className="header-row-bottom">
      <button type="button" id="meme-part-btn" className="simple-btn" onClick={()=>navigate('meme-part-info')}>{t(activePanel==='meme-part-info'?'about_back_btn':'meme_part_btn')}</button>
      <div className="header-wallet-block">
        <div className="wallet-info">{t('wallet_balance')}</div>
        <div id="wallet-mini-section"><button type="button" className="simple-btn" id="connect-wallet-btn" onClick={()=>window.alert(t('wallet_disconnected'))}>{t('connect_wallet_btn')}</button></div>
      </div>
    </div>
  </header>;
}

function Roadmap({ t }) {
  return <div className="roadmap-section"><div className="roadmap-snake-track">
    {roadmapStages.map((stage, index) => {
      const key = 'stage_' + stage.number;
      const status = t(key + '_status');
      return <React.Fragment key={stage.number}>
        <div className={'roadmap-step ' + (index%2===0?'step-left':'step-right')} data-step={stage.number}>
          <div className="step-marker"><span className="step-num">{String(stage.number).padStart(2,'0')}</span><span className="step-icon">{stage.icon}</span></div>
          <div className="step-card">
            <div className={'step-status status-'+status}>{t('status_'+status)}</div>
            <h3 className="step-title">{t(key+'_title')}</h3>
            <p className="step-desc">{t(key+'_desc')}</p>
          </div>
        </div>
        {index<roadmapStages.length-1&&<div className={'step-connector '+(index%2===0?'arrow-right':'arrow-left')} data-connector={stage.number}><ArrowIcon/></div>}
      </React.Fragment>;
    })}
  </div><div className="roadmap-bg-glow"/></div>;
}

function NavigationPanel({ panelId, t }) {
  const item = navigationItems.find(item=>item.panelId===panelId);
  if (!item) return null;
  return <section id={panelId} className={panelId==='road-map-info'?'roadmap-wrapper':'simple-card navigation-panel'}>
    <h2 className={'about-title '+(panelId==='road-map-info'?'roadmap-title':'')}>{t(item.titleKey)}</h2>
    {panelId==='road-map-info'?<Roadmap t={t}/>:<p className="content-text">{t(item.descriptionKey)}</p>}
  </section>;
}

function IdeaCard({ idea, t }) {
  return <article className="simple-card idea-card">
    <p className="idea-text">“{t(idea.textKey)}”</p>
    <div className="idea-vote-row">
      <span className="like-badge">💎 {idea.likes}</span>
      <button type="button" className="vote-btn up" aria-label={t('vote_btn_label')} onClick={()=>window.alert(t('voting_unavailable'))}><VoteIcon/></button>
    </div>
    <div className="idea-meta">
      <small className="author-meta"><span className="author-id-label-text">{t('author_id_label')}</span>: <span className="author-id-value">{shortenId(idea.id)}</span></small>
      <small className="created-at">{dateLabel(idea.createdAt)}</small>
    </div>
  </article>;
}


function Feed({ t }) {
  const [sort, setSort] = useState('diamonds_desc');
  // Keep the same IdeaCard component instances while the CSS grid reflows
  // across desktop, tablet and mobile widths. No JS media-query remounts.
  const sorted = useMemo(()=>sortedIdeas(sort),[sort]);
  return <div id="ideas-feed">
    <h2>{t('community_ideas_title')}</h2>
    <div className="sort-row">
      <div className="sort-label" title={t('sort_title')} aria-hidden="true"/>
      <div className="type-selector" role="group" aria-label={t('sort_aria_label')}>
        {['diamonds_desc','diamonds_asc','created_desc'].map((value,index)=><label className="radio-label" key={value}>
          <input type="radio" name="sort" value={value} checked={sort===value} onChange={()=>setSort(value)}/>
          <span className="radio-custom">{t(['sort_max','sort_min','sort_new'][index])}</span>
        </label>)}
      </div>
    </div>
    <div className="feed-columns">
      {sorted.map(idea=><IdeaCard key={idea.id} idea={idea} t={t}/>)}
    </div>
  </div>;
}

function Partners({ t }) {
  return <section className="partners-section" aria-label={t('partners_aria_label')}>
    <h2>{t('partners_title')}</h2>
    <div className="partners-logos">
      {partners.map(partner=><a className="partner-logo" href={partner.url} target="_blank" rel="noopener noreferrer" key={partner.url}>
        <span className="partner-logo-name">{partner.name}</span>
      </a>)}
    </div>
  </section>;
}

function App() {
  const [language,setLanguage] = useState(initialLanguage);
  const [activePanel,setActivePanel] = useState(null);
  const [infoVisible,setInfoVisible] = useState(true);
  const t = (key)=>catalogs[language][key]??key;
  const navigate=(id)=>setActivePanel(previous=>previous===id?null:id);
  useEffect(()=>{document.documentElement.lang=language;},[language]);
  useEffect(()=>{
    const onVisibility=()=>document.documentElement.classList.toggle('animations-paused',document.hidden);
    document.addEventListener('visibilitychange',onVisibility);
    return ()=>document.removeEventListener('visibilitychange',onVisibility);
  },[]);
  return <>
    <Biosphere/>
    <Header t={t} language={language} setLanguage={setLanguage} activePanel={activePanel} navigate={navigate}/>
    <div id="content">
      <main className="main-wrapper">
        <h1>{t('header_title')}</h1>
        {activePanel
          ? <NavigationPanel panelId={activePanel} t={t}/>
          : <>
              {infoVisible&&<div id="project-info" className="simple-card">
                <button id="close-info-btn" className="close-icon" type="button" aria-label={t('close_btn')} onClick={()=>setInfoVisible(false)}>×</button>
                <h2>{t('info_title')}</h2><p className="content-text">{t('info_desc')}</p>
                <div className="intent-more-wrapper"><button id="intent-more-btn" className="simple-btn" type="button" onClick={()=>navigate('about-info')}>{t('intent_more_btn')}</button></div>
              </div>}
              <Feed t={t}/>
            </>}
        <Partners t={t}/>
      </main>
    </div>
    <footer><p>© <span id="current-year">{new Date().getFullYear()}</span> {t('footer_project_name')}.</p></footer>
  </>;
}

createRoot(document.getElementById('root')).render(<App/>);
