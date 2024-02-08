// ** Styles
import '@src/assets/scss/home.css';
import '@src/assets/scss/nav.css';
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom'

const Landing = () => {
    const [nightMode, setNightMode] = useState(parseInt(localStorage.getItem('nightmode')));

      useEffect(() => {
        const turnTheme = (mode) => {
          const textItems = mode ? document.querySelectorAll('.light-text,.light-text-reverse') : document.querySelectorAll('.dark-text,.dark-text-reverse');
          const backItems = mode ? document.querySelectorAll('.light-background,.light-background-reverse') : document.querySelectorAll('.dark-background,.dark-background-reverse');
          const cardItems = mode ? document.querySelectorAll('.light-card') : document.querySelectorAll('.dark-card');
          const cardTextItems = mode ? document.querySelectorAll('.light-card-text') : document.querySelectorAll('.dark-card-text');

          const toggleClass = (items, class1, class2) => {
            items.forEach(item => {
              item.classList.remove(class1);
              item.classList.add(class2);
            });
          }

          toggleClass(textItems, mode ? 'light-text' : 'dark-text', mode ? 'dark-text' : 'light-text');
          toggleClass(backItems, mode ? 'light-background' : 'dark-background', mode ? 'dark-background' : 'light-background');
          toggleClass(cardItems, mode ? 'light-card' : 'dark-card', mode ? 'dark-card' : 'light-card');
          toggleClass(cardTextItems, mode ? 'light-card-text' : 'dark-card-text', mode ? 'dark-card-text' : 'light-card-text');
        }

        turnTheme(nightMode);
    }, [nightMode]);
  return (
    <>
    <body class="landing">
    <div class="bodytohidenav">
        <nav class="navbar">
            <div style={{position: 'relative'}}>
                <section id="togel">
                    <i class="fa fa-bars" onclick="showMenu(this)"></i>
                    <a href="index.html" class="logo-nav"><img src="src/views/pages/assets/SEA-logo.png" alt="Logo"/></a>
                    <div class="close" onclick="hideMenu(this)"></div>
                        <div>
                            <a href="#home" class="dark-text">HOME</a>
                            <a href="#programs" class="dark-text">PROGRAMS</a>
                            <a href="#about" class="dark-text">ABOUT</a>
                            <a href="#assistants" class="dark-text">ASSISTANTS</a>
                            <a onClick={() => {
        setNightMode(prevMode => prevMode === 1 ? 0 : 1);
        localStorage.setItem('nightmode', nightMode);
      }}><i class="bi bi-sun dark-text"></i></a>
                        </div>
                    </section>
            </div>
        </nav>
        
        <div class="contentt section1 dark-background" id="home">
            <section>
                <div class="welcome dark-text">WELCOME TO</div>
                <div class="lab-text">SEA LABORATORY</div>
                <div class="buttons">
                <Link to='/login' style={{textDecoration:'none'}}>
                  <div class="button" id="lms">
                    LOGIN
                  </div>
                </Link>
                    <a href="#explore" class="button explore dark-background" id="explore">EXPLORE</a>
                </div>
            </section>
        </div>

        <div class="contentt section2 dark-background" id="programs">
            <section>
                <div class="section2-content">
                    <h2 class="dark-card-text">PROGRAMS</h2>
                    <div class="cardd studygroup dark-card">
                        <div class="study-card-text"> 
                            <h3><b>STUDY GROUP</b></h3>
                            <p>
                                SEA Laboratory Study Group adalah komunitas belajar yang didedikasikan untuk membantu 
                                anggotanya mengembangkan keterampilan di berbagai bidang teknologi informasi. 
                                Dengan fokus pada lima divisi utama, study group ini memberikan kesempatan kepada 
                                anggotanya untuk mengeksplorasi dan mendalami aspek-aspek kunci dalam dunia pengembangan 
                                perangkat lunak.
                            </p>
                        </div>
                        <div class="study-card dark-card">
                            <img src="src/views/pages/assets/sgfundamental_logo.png" alt="Study Group Fundamental"/>
                            <div class="study-card-text">
                                <h4>Fundamental</h4>
                                <p>Divisi ini membantu anggota study group membangun dasar-dasar yang kuat dalam pemrograman.</p>
                            </div>
                        </div>
                        <div class="study-card dark-card">
                            <img src="src/views/pages/assets/sgdesktop_logo.png" alt="Study Group Fundamental"/>
                            <div class="study-card-text">
                                <h4>Desktop Development</h4>
                                <p>Divisi ini mengeksplorasi pengembangan perangkat lunak desktop untuk berbagai platform.</p>
                            </div>
                        </div>
                        <div class="study-card dark-card">
                            <img src="src/views/pages/assets/sgmobile_logo.png" alt="Study Group Fundamental"/>
                            <div class="study-card-text">
                                <h4>Mobile Development</h4>
                                <p>Divisi ini fokus dalam pengembangan aplikasi mobile untuk platform Android dengan bahasa Kotlin</p>
                            </div>
                        </div>
                        <div class="study-card dark-card">
                            <img src="src/views/pages/assets/sgweb_logo.png" alt="Study Group Fundamental"/>
                            <div class="study-card-text">
                                <h4>Web Development</h4>
                                <p>Divisi ini akan merambah dunia web mulai dari html hingga framework web modern</p>
                            </div>
                        </div>
                        <div class="study-card dark-card">
                            <img src="src/views/pages/assets/sggame_logo.png" alt="Study Group Fundamental"/>
                            <div class="study-card-text">
                                <h4>Game Development</h4>
                                <p>Divisi ini mengajak anggotanya untuk memahami seluk-beluk pembuatan permainan menggunakan unity engine.</p>
                            </div>
                        </div>
                    </div>

                    <div class="cardd researchgroup dark-card">
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

        <div class="contentt section3 dark-card" id="about">
            <section>
                <div class="section3-content">
                    <h2 class="dark-card">ABOUT US</h2>
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

        <div class="contentt section4 dark-card" id="assistants">
            <section>
                <div class="section4-content">
                    <h2>ASSISTANTS</h2>
                    <section class="executive-card">
                        <div class="assistant-card dark-card">
                            <img src="src/views/pages/assets/assistants/cma.png" alt="CMA"/>
                            <h3>Cetta Maulana Andhika</h3>
                            <h4>Wakil Koordinator Asisten</h4>
                            <div class="social-icons">
                                <a href="https://www.instagram.com/cettamaulana_" target="_blank"><img src="src/views/pages/assets/assistants/instagram_social.svg" alt="Instagram"/></a>
                                <a href="https://www.linkedin.com/in/cettama/" target="_blank"><img src="src/views/pages/assets/assistants/linkedin_social.svg" alt="LinkedIn"/></a>
                            </div>
                        </div>
                        <div class="assistant-card dark-card">
                            <img src="src/views/pages/assets/assistants/ara.png" alt="ARA"/>
                            <h3>Faraday Barr Fatahillah</h3>
                            <h4>Koordinator Asisten</h4>
                            <div class="social-icons">
                                <a href="https://www.instagram.com/faraday.bf/" target="_blank"><img src="src/views/pages/assets/assistants/instagram_social.svg" alt="Instagram"/></a>
                                <a href="https://www.linkedin.com/in/faradaybarr/" target="_blank"><img src="src/views/pages/assets/assistants/linkedin_social.svg" alt="LinkedIn"/></a>
                            </div>
                        </div>
                        <div class="assistant-card dark-card">
                            <img src="src/views/pages/assets/assistants/dao.png" alt="DAO"/>
                            <h3>Aldo Nitehe Lase</h3>
                            <h4>Koordinator Riset</h4>
                            <div class="social-icons">
                                <a href="https://www.instagram.com/lase_aldo" target="_blank"><img src="src/views/pages/assets/assistants/instagram_social.svg" alt="Instagram"/></a>
                                <a href="https://www.linkedin.com/in/aldolase/" target="_blank"><img src="src/views/pages/assets/assistants/linkedin_social.svg" alt="LinkedIn"/></a>
                            </div>
                        </div>
                    </section>
                    <section class="administration-card dark-card">
                        <div class="assistant-card dark-card">
                            <img src="src/views/pages/assets/assistants/krz.png" alt="KRZ"/>
                            <h3>Kinanti Rahayu Az-Zahra</h3>
                            <h4>Sekretaris</h4>
                            <div class="social-icons">
                                <a href="https://www.instagram.com/kinanra/" target="_blank"><img src="src/views/pages/assets/assistants/instagram_social.svg" alt="Instagram"/></a>
                                <a href="https://www.linkedin.com/in/kinantirahayuazhra/" target="_blank"><img src="src/views/pages/assets/assistants/linkedin_social.svg" alt="LinkedIn"/></a>
                            </div>
                        </div>
                        <div class="assistant-card dark-card">
                            <img src="src/views/pages/assets/assistants/sam.png" alt="SAM" style={{objectPosition: '50% 50%'}}/>
                            <h3>Sam Alim Ramadhan</h3>
                            <h4>Sekretaris</h4>
                            <div class="social-icons">
                                <a href="https://www.instagram.com/limeysplash_/" target="_blank"><img src="src/views/pages/assets/assistants/instagram_social.svg" alt="Instagram"/></a>
                                <a href="https://www.linkedin.com/in/samalimramadhan/" target="_blank"><img src="src/views/pages/assets/assistants/linkedin_social.svg" alt="LinkedIn"/></a>
                            </div>
                        </div>
                        <div class="assistant-card dark-card">
                            <img src="src/views/pages/assets/assistants/ats.png" alt="ATS"/>
                            <h3>Azmi Taqiuddin Syah</h3>
                            <h4>Bendahara</h4>
                            <div class="social-icons">
                                <a href="https://www.instagram.com/miuddinsyah_" target="_blank"><img src="src/views/pages/assets/assistants/instagram_social.svg" alt="Instagram"/></a>
                                <a href="https://www.linkedin.com/in/miuddinsyah/" target="_blank"><img src="src/views/pages/assets/assistants/linkedin_social.svg" alt="LinkedIn"/></a>
                            </div>
                        </div>
                    </section>
                    <section class="practicum-card">
                        <div class="assistant-card dark-card">
                            <img src="src/views/pages/assets/assistants/yna.png" alt="YNA"/>
                            <h3>Panji Christoper Silalahi</h3>
                            <h4>Praktikum</h4>
                            <div class="social-icons">
                                <a href="https://www.instagram.com/panjichrst_/" target="_blank"><img src="src/views/pages/assets/assistants/instagram_social.svg" alt="Instagram"/></a>
                                <a href="https://www.linkedin.com/in/pajichrstp/" target="_blank"><img src="src/views/pages/assets/assistants/linkedin_social.svg" alt="LinkedIn"/></a>
                            </div>
                        </div>
                        <div class="assistant-card dark-card">
                            <img src="src/views/pages/assets/assistants/yog.png" alt="YOG"/>
                            <h3>Yohannes Yogas Herlambang</h3>
                            <h4>Praktikum</h4>
                            <div class="social-icons">
                                <a href="https://www.instagram.com/ygs.hrlmbng" target="_blank"><img src="src/views/pages/assets/assistants/instagram_social.svg" alt="Instagram"/></a>
                                <a href="https://www.linkedin.com/in/yogas-herlambang-9672931bb/" target="_blank"><img src="src/views/pages/assets/assistants/linkedin_social.svg" alt="LinkedIn"/></a>
                            </div>
                        </div>
                        <div class="assistant-card dark-card">
                            <img src="src/views/pages/assets/assistants/ars.png" alt="ARS"/>
                            <h3>Muh. Abyan Ridhan Siregar</h3>
                            <h4>Praktikum</h4>
                            <div class="social-icons">
                                <a href="https://www.instagram.com/muhammadabyann" target="_blank"><img src="src/views/pages/assets/assistants/instagram_social.svg" alt="Instagram"/></a>
                                <a href="https://www.linkedin.com/in/muhammad-abyan-8451471b6/" target="_blank"><img src="src/views/pages/assets/assistants/linkedin_social.svg" alt="LinkedIn"/></a>
                            </div>
                        </div>
                        <div class="assistant-card dark-card">
                            <img src="src/views/pages/assets/assistants/sef.png" alt="SEF" style={{objectPosition: '50% 70%'}}/>
                            <h3>Sef Sofa Maulanaja</h3>
                            <h4>Praktikum</h4>
                            <div class="social-icons">
                                <a href="https://www.instagram.com/maulanaja_/" target="_blank"><img src="src/views/pages/assets/assistants/instagram_social.svg" alt="Instagram"/></a>
                                <a href="https://www.linkedin.com/in/sefsofamaulanaja/" target="_blank"><img src="src/views/pages/assets/assistants/linkedin_social.svg" alt="LinkedIn"/></a>
                            </div>
                        </div>
                    </section>
                    <section class="publicrelation-card">
                        <div class="assistant-card dark-card">
                            <img src="src/views/pages/assets/assistants/kin.png" alt="KIN"/>
                            <h3>Kinanti Aria Widaswara</h3>
                            <h4>Public Relation</h4>
                            <div class="social-icons">
                                <a href="https://www.instagram.com/kinanti.aria/" target="_blank"><img src="src/views/pages/assets/assistants/instagram_social.svg" alt="Instagram"/></a>
                                <a href="https://www.linkedin.com/in/kinantiaria/" target="_blank"><img src="src/views/pages/assets/assistants/linkedin_social.svg" alt="LinkedIn"/></a>
                            </div>
                        </div>
                        <div class="assistant-card dark-card">
                            <img src="src/views/pages/assets/assistants/axl.png" alt="AXL" style={{objectPosition: '50% 30%'}}/>
                            <h3>Axel David</h3>
                            <h4>Public Relation</h4>
                            <div class="social-icons">
                                <a href="https://www.instagram.com/axelldvid/" target="_blank"><img src="src/views/pages/assets/assistants/instagram_social.svg" alt="Instagram"/></a>
                                <a href="https://www.linkedin.com/in/axelldavid/" target="_blank"><img src="src/views/pages/assets/assistants/linkedin_social.svg" alt="LinkedIn"/></a>
                            </div>
                        </div>
                        <div class="assistant-card dark-card">
                            <img src="src/views/pages/assets/assistants/sna.png" alt="SNA" style={{objectPosition: '50% 55%'}}/>
                            <h3>Sulthan Nauval Abdillah</h3>
                            <h4>Public Relation</h4>
                            <div class="social-icons">
                                <a href="https://www.instagram.com/sulthan.13" target="_blank"><img src="src/views/pages/assets/assistants/instagram_social.svg" alt="Instagram"/></a>
                                <a href="https://www.linkedin.com/in/sulthannauval/" target="_blank"><img src="src/views/pages/assets/assistants/linkedin_social.svg" alt="LinkedIn"/></a>
                            </div>
                        </div>
                    </section>
                    <section class="logistics-card">
                        <div class="assistant-card dark-card">
                            <img src="src/views/pages/assets/assistants/tam.png" alt="TAM"/>
                            <h3>Muh. Farrel Ahadi Tama</h3>
                            <h4>Inventaris</h4>
                            <div class="social-icons">
                                <a href="https://www.instagram.com/farrel.tamaa/" target="_blank"><img src="src/views/pages/assets/assistants/instagram_social.svg" alt="Instagram"/></a>
                                <a href="https://www.linkedin.com/in/muhammad-farrel-ahadi-tama-0b0628220/" target="_blank"><img src="src/views/pages/assets/assistants/linkedin_social.svg" alt="LinkedIn"/></a>
                            </div>
                        </div>
                        <div class="assistant-card dark-card">
                            <img src="src/views/pages/assets/assistants/and.png" alt="AND" style={{objectPosition: '50% 50%'}}/>
                            <h3>Andreas Wahyu Prayogo</h3>
                            <h4>Inventaris</h4>
                            <div class="social-icons">
                                <a href="https://www.instagram.com/andreewp__" target="_blank"><img src="src/views/pages/assets/assistants/instagram_social.svg" alt="Instagram"/></a>
                                <a href="https://www.linkedin.com/in/andreewp__" target="_blank"><img src="src/views/pages/assets/assistants/linkedin_social.svg" alt="LinkedIn"/></a>
                            </div>
                        </div>
                        <div class="assistant-card dark-card">
                            <img src="src/views/pages/assets/assistants/fdz.png" alt="FDZ" style={{objectPosition: '50% 50%'}}/>
                            <h3>Fadhil Dzikri Aqila</h3>
                            <h4>Inventaris</h4>
                            <div class="social-icons">
                                <a href="https://www.instagram.com/fxdhil.dz/" target="_blank"><img src="src/views/pages/assets/assistants/instagram_social.svg" alt="Instagram"/></a>
                                <a href="https://www.linkedin.com/in/fxdhil.dz" target="_blank"><img src="src/views/pages/assets/assistants/linkedin_social.svg" alt="LinkedIn"/></a>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </div>

        <footer class="dark-background">
            <div class="address">
                <h2 class="dark-text">ADDRESS</h2>
                <p>
                    Gedung TULT 1405 Lantai 14,<br></br>
                    Jl. Telekomunikasi Terusan Buah Batu,<br></br>
                    Bandung 40257,<br></br>
                    Indonesia
                </p>
            </div>
            <div class="social-media">
                <h2 class="dark-text">FOLLOW US</h2>
                <div>
                    <a href="https://www.instagram.com/sea.laboratory/" target="_blank"><img src="src/views/pages/assets/instagram_icon.png" alt="Instagram"/></a>
                    <a href="https://liff.line.me/1645278921-kWRPP32q/?accountId=748waapd" target="_blank"><img src="src/views/pages/assets/line_icon.png" alt="Line"/></a>
                    <a href="https://www.youtube.com/@SEALaboratory" target="_blank"><img src="src/views/pages/assets/youtube_icon.png" alt="Youtube"/></a>
                </div>
            </div>
        </footer>
    </div>
  </body>
    </>
  )
}

export default Landing