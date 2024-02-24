// ** Styles
import '@src/assets/scss/home.scss'
import '@src/assets/scss/nav.scss'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Sun, Menu } from 'react-feather'
import { useSkin } from "@hooks/useSkin"

import logo from '@src/assets/images/landing/SEA-logo.png'

import instagram from '@src/assets/images/landing/assistants/instagram_social.svg'
import linkedin from '@src/assets/images/landing/assistants/linkedin_social.svg'
import sgfundamental from '@src/assets/images/landing/sgfundamental_logo.png'
import sgdesktop from '@src/assets/images/landing/sgdesktop_logo.png'
import sggame from '@src/assets/images/landing/sggame_logo.png'
import sgweb from '@src/assets/images/landing/sgweb_logo.png'
import sgmob from '@src/assets/images/landing/sgmobile_logo.png'
import instagramicon from '@src/assets/images/landing/instagram_icon.png'
import lineicon from '@src/assets/images/landing/line_icon.png'
import youtubeicon from '@src/assets/images/landing/youtube_icon.png'

import cma from '@src/assets/images/landing/assistants/cma.png'
import ara from '@src/assets/images/landing/assistants/ara.png'
import dao from '@src/assets/images/landing/assistants/dao.png'
import krz from '@src/assets/images/landing/assistants/krz.png'
import ats from '@src/assets/images/landing/assistants/ats.png'
import sam from '@src/assets/images/landing/assistants/sam.png'
import yog from '@src/assets/images/landing/assistants/yog.png'
import yna from '@src/assets/images/landing/assistants/yna.png'
import ars from '@src/assets/images/landing/assistants/ars.png'
import sef from '@src/assets/images/landing/assistants/sef.png'
import kin from '@src/assets/images/landing/assistants/kin.png'
import axl from '@src/assets/images/landing/assistants/axl.png'
import sna from '@src/assets/images/landing/assistants/sna.png'
import tam from '@src/assets/images/landing/assistants/tam.png'
import and from '@src/assets/images/landing/assistants/and.png'
import fdz from '@src/assets/images/landing/assistants/fdz.png'

const Landing = () => {
  const [nightMode, setNightMode] = useState(JSON.parse(localStorage.getItem('nightmode')) ?? false)
  const { skin, setSkin } = useSkin()
  useEffect(() => {
    skin === 'light' ? setNightMode(false) : setNightMode(true)
  }, []);
  useEffect(() => {
    const turnTheme = (mode) => {
      const textItems = mode ? document.querySelectorAll('.light-text,.light-text-reverse') : document.querySelectorAll('.dark-text,.dark-text-reverse')
      const backItems = mode ? document.querySelectorAll('.light-background,.light-background-reverse') : document.querySelectorAll('.dark-background,.dark-background-reverse')
      const cardItems = mode ? document.querySelectorAll('.light-card') : document.querySelectorAll('.dark-card')
      const cardTextItems = mode ? document.querySelectorAll('.light-card-text') : document.querySelectorAll('.dark-card-text')

      const toggleClass = (items, class1, class2) => {
        items.forEach(item => {
          item.classList.remove(class1)
          item.classList.add(class2)
        })
      }
      

      toggleClass(textItems, mode ? 'light-text' : 'dark-text', mode ? 'dark-text' : 'light-text')
      toggleClass(backItems, mode ? 'light-background' : 'dark-background', mode ? 'dark-background' : 'light-background')
      toggleClass(cardItems, mode ? 'light-card' : 'dark-card', mode ? 'dark-card' : 'light-card')
      toggleClass(cardTextItems, mode ? 'light-card-text' : 'dark-card-text', mode ? 'dark-card-text' : 'light-card-text')
      nightMode ? setSkin("dark") : setSkin("light");

      localStorage.setItem('nightmode', nightMode)
    }
    turnTheme(nightMode)
  }, [nightMode])
  const [showMenu, setShowMenu] = useState(false)
  const togglemenu = () => {
    setShowMenu(!showMenu)
  }
  return (
    <div className="landing">
      <div className="bodytohidenav">
        <nav className="navbar">
          <div style={{ position: 'relative' }}>
            <section id="togel" style={{ right: showMenu ? "-100vw" : "-300vw" }}>
              <Menu className="fa fa-bars" onClick={togglemenu}/>
              {/* <i className="fa fa-bars" onClick={toggletheme}></i> */}
              <a href="index.html" className="logo-nav"><img src={logo} alt="Logo" /></a>
              <div className="close" onClick={togglemenu}></div>
              <div>
                <a href="#home" className="dark-text">HOME</a>
                <a href="#programs" className="dark-text">PROGRAMS</a>
                <a href="#about" className="dark-text">ABOUT</a>
                <a href="#assistants" className="dark-text">ASSISTANTS</a>
                <a onClick={() => {
                  setNightMode(!nightMode)
                }}>
                  <Sun />
                </a>
              </div>
            </section>
          </div>
        </nav>

        <div className="contentt section1 dark-background" id="home">
          <section>
            <div className="welcome dark-text">WELCOME TO</div>
            <div className="lab-text">SEA LABORATORY</div>
            <div className="buttons">
              <Link to='/login' style={{ textDecoration: 'none' }}>
                <div className="button" id="lms">
                  LOGIN
                </div>
              </Link>
              <a href="#explore" className="button explore dark-background" id="explore">EXPLORE</a>
            </div>
          </section>
        </div>

        <div className="contentt section2 dark-background" id="programs">
          <section>
            <div className="section2-content">
              <h2 className="dark-card-text">PROGRAMS</h2>
              <div className="cardd studygroup dark-card">
                <div className="study-card-text">
                  <h3><b>STUDY GROUP</b></h3>
                  <p>
                    SEA Laboratory Study Group adalah komunitas belajar yang didedikasikan untuk membantu
                    anggotanya mengembangkan keterampilan di berbagai bidang teknologi informasi.
                    Dengan fokus pada lima divisi utama, study group ini memberikan kesempatan kepada
                    anggotanya untuk mengeksplorasi dan mendalami aspek-aspek kunci dalam dunia pengembangan
                    perangkat lunak.
                  </p>
                </div>
                <div className="study-card dark-card">
                  <img src={sgfundamental} alt="Study Group Fundamental" />
                  <div className="study-card-text">
                    <h4>Fundamental</h4>
                    <p>Divisi ini membantu anggota study group membangun dasar-dasar yang kuat dalam pemrograman.</p>
                  </div>
                </div>
                <div className="study-card dark-card">
                  <img src={sgdesktop} alt="Study Group Fundamental" />
                  <div className="study-card-text">
                    <h4>Desktop Development</h4>
                    <p>Divisi ini mengeksplorasi pengembangan perangkat lunak desktop untuk berbagai platform.</p>
                  </div>
                </div>
                <div className="study-card dark-card">
                  <img src={sgmob} alt="Study Group Fundamental" />
                  <div className="study-card-text">
                    <h4>Mobile Development</h4>
                    <p>Divisi ini fokus dalam pengembangan aplikasi mobile untuk platform Android dengan bahasa Kotlin</p>
                  </div>
                </div>
                <div className="study-card dark-card">
                  <img src={sgweb} alt="Study Group Fundamental" />
                  <div className="study-card-text">
                    <h4>Web Development</h4>
                    <p>Divisi ini akan merambah dunia web mulai dari html hingga framework web modern</p>
                  </div>
                </div>
                <div className="study-card dark-card">
                  <img src={sggame} alt="Study Group Fundamental" />
                  <div className="study-card-text">
                    <h4>Game Development</h4>
                    <p>Divisi ini mengajak anggotanya untuk memahami seluk-beluk pembuatan permainan menggunakan unity engine.</p>
                  </div>
                </div>
              </div>

              <div className="cardd researchgroup dark-card">
                <h3><b>RESEARCH GROUP</b></h3>
                <p>
                  Research Group SEA Laboratory adalah sebuah kelompok penelitian yang berfokus pada
                  pengembangan dan inovasi di bidang Software. Dipimpin oleh seorang dosen yang berkomitmen,
                  laboratorium ini memusatkan perhatian pada berbagai aspek software engineering, termasuk
                  analisis kebutuhan, desain, pengembangan, pengujian, dan pemeliharaan aplikasi.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="contentt section3 dark-card" id="about">
          <section>
            <div className="section3-content">
              <h2 className="dark-card">ABOUT US</h2>
              <p>
                <b>SEA Laboratory (Software Engineering and Application)</b> adalah laboratorium
                prodi jurusan <b>S1 Teknik Komputer</b> yang berlokasi di <b>Telkom University Bandung</b>.
                <br></br>
                Laboratorium ini juga menyediakan fasilitas dan dukungan bagi mahasiswa dan
                dosen yang ingin melakukan penelitian, pengembangan, dan pengajaran di
                bidang rekayasa perangkat lunak dan aplikasi.
              </p>
            </div>
          </section>
        </div>

        <div className="contentt section4 dark-card" id="assistants">
          <section>
            <div className="section4-content">
              <h2>ASSISTANTS</h2>
              <section className="executive-card">
                <div className="assistant-card dark-card">
                  <img src={cma} alt="CMA" />
                  <h3>Cetta Maulana Andhika</h3>
                  <h4>Wakil Koordinator Asisten</h4>
                  <div className="social-icons">
                    <a href="https://www.instagram.com/cettamaulana_" target="_blank"><img src={instagram} alt="Instagram" /></a>
                    <a href="https://www.linkedin.com/in/cettama/" target="_blank"><img src={linkedin} alt="LinkedIn" /></a>
                  </div>
                </div>
                <div className="assistant-card dark-card">
                  <img src={ara} alt="ARA" />
                  <h3>Faraday Barr Fatahillah</h3>
                  <h4>Koordinator Asisten</h4>
                  <div className="social-icons">
                    <a href="https://www.instagram.com/faraday.bf/" target="_blank"><img src={instagram} alt="Instagram" /></a>
                    <a href="https://www.linkedin.com/in/faradaybarr/" target="_blank"><img src={linkedin} alt="LinkedIn" /></a>
                  </div>
                </div>
                <div className="assistant-card dark-card">
                  <img src={dao} alt="DAO" />
                  <h3>Aldo Nitehe Lase</h3>
                  <h4>Koordinator Riset</h4>
                  <div className="social-icons">
                    <a href="https://www.instagram.com/lase_aldo" target="_blank"><img src={instagram} alt="Instagram" /></a>
                    <a href="https://www.linkedin.com/in/aldolase/" target="_blank"><img src={linkedin} alt="LinkedIn" /></a>
                  </div>
                </div>
              </section>
              <section className="administration-card">
                <div className="assistant-card dark-card">
                  <img src={krz} alt="KRZ" />
                  <h3>Kinanti Rahayu Az-Zahra</h3>
                  <h4>Sekretaris</h4>
                  <div className="social-icons">
                    <a href="https://www.instagram.com/kinanra/" target="_blank"><img src={instagram} alt="Instagram" /></a>
                    <a href="https://www.linkedin.com/in/kinantirahayuazhra/" target="_blank"><img src={linkedin} alt="LinkedIn" /></a>
                  </div>
                </div>
                <div className="assistant-card dark-card">
                  <img src={sam} alt="SAM" style={{ objectPosition: '50% 50%' }} />
                  <h3>Sam Alim Ramadhan</h3>
                  <h4>Sekretaris</h4>
                  <div className="social-icons">
                    <a href="https://www.instagram.com/limeysplash_/" target="_blank"><img src={instagram} alt="Instagram" /></a>
                    <a href="https://www.linkedin.com/in/samalimramadhan/" target="_blank"><img src={linkedin} alt="LinkedIn" /></a>
                  </div>
                </div>
                <div className="assistant-card dark-card">
                  <img src={ats} alt="ATS" />
                  <h3>Azmi Taqiuddin Syah</h3>
                  <h4>Bendahara</h4>
                  <div className="social-icons">
                    <a href="https://www.instagram.com/miuddinsyah_" target="_blank"><img src={instagram} alt="Instagram" /></a>
                    <a href="https://www.linkedin.com/in/miuddinsyah/" target="_blank"><img src={linkedin} alt="LinkedIn" /></a>
                  </div>
                </div>
              </section>
              <section className="practicum-card">
                <div className="assistant-card dark-card">
                  <img src={yna} alt="YNA" />
                  <h3>Panji Christoper Silalahi</h3>
                  <h4>Praktikum</h4>
                  <div className="social-icons">
                    <a href="https://www.instagram.com/panjichrst_/" target="_blank"><img src={instagram} alt="Instagram" /></a>
                    <a href="https://www.linkedin.com/in/pajichrstp/" target="_blank"><img src={linkedin} alt="LinkedIn" /></a>
                  </div>
                </div>
                <div className="assistant-card dark-card">
                  <img src={yog} alt="YOG" />
                  <h3>Yohannes Yogas Herlambang</h3>
                  <h4>Praktikum</h4>
                  <div className="social-icons">
                    <a href="https://www.instagram.com/ygs.hrlmbng" target="_blank"><img src={instagram} alt="Instagram" /></a>
                    <a href="https://www.linkedin.com/in/yogas-herlambang-9672931bb/" target="_blank"><img src={linkedin} alt="LinkedIn" /></a>
                  </div>
                </div>
                <div className="assistant-card dark-card">
                  <img src={ars} alt="ARS" />
                  <h3>Muh. Abyan Ridhan Siregar</h3>
                  <h4>Praktikum</h4>
                  <div className="social-icons">
                    <a href="https://www.instagram.com/muhammadabyann" target="_blank"><img src={instagram} alt="Instagram" /></a>
                    <a href="https://www.linkedin.com/in/muhammad-abyan-8451471b6/" target="_blank"><img src={linkedin} alt="LinkedIn" /></a>
                  </div>
                </div>
                <div className="assistant-card dark-card">
                  <img src={sef} alt="SEF" style={{ objectPosition: '50% 70%' }} />
                  <h3>Sef Sofa Maulanaja</h3>
                  <h4>Praktikum</h4>
                  <div className="social-icons">
                    <a href="https://www.instagram.com/maulanaja_/" target="_blank"><img src={instagram} alt="Instagram" /></a>
                    <a href="https://www.linkedin.com/in/sefsofamaulanaja/" target="_blank"><img src={linkedin} alt="LinkedIn" /></a>
                  </div>
                </div>
              </section>
              <section className="publicrelation-card">
                <div className="assistant-card dark-card">
                  <img src={kin} alt="KIN" />
                  <h3>Kinanti Aria Widaswara</h3>
                  <h4>Public Relation</h4>
                  <div className="social-icons">
                    <a href="https://www.instagram.com/kinanti.aria/" target="_blank"><img src={instagram} alt="Instagram" /></a>
                    <a href="https://www.linkedin.com/in/kinantiaria/" target="_blank"><img src={linkedin} alt="LinkedIn" /></a>
                  </div>
                </div>
                <div className="assistant-card dark-card">
                  <img src={axl} alt="AXL" style={{ objectPosition: '50% 30%' }} />
                  <h3>Axel David</h3>
                  <h4>Public Relation</h4>
                  <div className="social-icons">
                    <a href="https://www.instagram.com/axelldvid/" target="_blank"><img src={instagram} alt="Instagram" /></a>
                    <a href="https://www.linkedin.com/in/axelldavid/" target="_blank"><img src={linkedin} alt="LinkedIn" /></a>
                  </div>
                </div>
                <div className="assistant-card dark-card">
                  <img src={sna} alt="SNA" style={{ objectPosition: '50% 55%' }} />
                  <h3>Sulthan Nauval Abdillah</h3>
                  <h4>Public Relation</h4>
                  <div className="social-icons">
                    <a href="https://www.instagram.com/sulthan.13" target="_blank"><img src={instagram} alt="Instagram" /></a>
                    <a href="https://www.linkedin.com/in/sulthannauval/" target="_blank"><img src={linkedin} alt="LinkedIn" /></a>
                  </div>
                </div>
              </section>
              <section className="logistics-card">
                <div className="assistant-card dark-card">
                  <img src={tam} alt="TAM" />
                  <h3>Muh. Farrel Ahadi Tama</h3>
                  <h4>Inventaris</h4>
                  <div className="social-icons">
                    <a href="https://www.instagram.com/farrel.tamaa/" target="_blank"><img src={instagram} alt="Instagram" /></a>
                    <a href="https://www.linkedin.com/in/muhammad-farrel-ahadi-tama-0b0628220/" target="_blank"><img src={linkedin} alt="LinkedIn" /></a>
                  </div>
                </div>
                <div className="assistant-card dark-card">
                  <img src={and} alt="AND" style={{ objectPosition: '50% 50%' }} />
                  <h3>Andreas Wahyu Prayogo</h3>
                  <h4>Inventaris</h4>
                  <div className="social-icons">
                    <a href="https://www.instagram.com/andreewp__" target="_blank"><img src={instagram} alt="Instagram" /></a>
                    <a href="https://www.linkedin.com/in/andreewp__" target="_blank"><img src={linkedin} alt="LinkedIn" /></a>
                  </div>
                </div>
                <div className="assistant-card dark-card">
                  <img src={fdz} alt="FDZ" style={{ objectPosition: '50% 50%' }} />
                  <h3>Fadhil Dzikri Aqila</h3>
                  <h4>Inventaris</h4>
                  <div className="social-icons">
                    <a href="https://www.instagram.com/fxdhil.dz/" target="_blank"><img src={instagram} alt="Instagram" /></a>
                    <a href="https://www.linkedin.com/in/fxdhil.dz" target="_blank"><img src={linkedin} alt="LinkedIn" /></a>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>

        <footer className="dark-background landing-footer">
          <div className="address">
            <h2 className="dark-text">ADDRESS</h2>
            <p>
              Gedung TULT 1405 Lantai 14,<br></br>
              Jl. Telekomunikasi Terusan Buah Batu,<br></br>
              Bandung 40257,<br></br>
              Indonesia
            </p>
          </div>
          <div className="social-media">
            <h2 className="dark-text">FOLLOW US</h2>
            <div>
              <a href="https://www.instagram.com/sea.laboratory/" target="_blank"><img src={instagramicon} alt="Instagram" /></a>
              <a href="https://liff.line.me/1645278921-kWRPP32q/?accountId=748waapd" target="_blank"><img src={lineicon} alt="Line" /></a>
              <a href="https://www.youtube.com/@SEALaboratory" target="_blank"><img src={youtubeicon} alt="Youtube" /></a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Landing