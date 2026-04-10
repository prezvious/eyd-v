import Link from "next/link";

import { ArrowRightIcon, FlagIcon, GitHubIcon, getGroupIcon } from "@/components/icons";
import { docsIndex, homeGroups, navGroups } from "@/lib/site-content";

const repoHref = "https://github.com/prezvious/eyd-v";

export function HomePage() {
  const introGroup = navGroups.find((group) => group.key === "pendahuluan");

  return (
    <div className="home-shell">
      <header className="home-header">
        <Link className="brand" href="/" prefetch={false}>
          <span className="brand-mark">
            <FlagIcon size={18} />
          </span>
          <span className="brand-text">
            <strong>EYD V</strong>
            <span>Belajar bahasa Indonesia dengan struktur yang rapi</span>
          </span>
        </Link>

        <div className="home-header-right">
          <nav className="home-nav">
            <Link href="/pengantar" prefetch={false}>Pengantar</Link>
            <Link href="/huruf" prefetch={false}>Huruf</Link>
            <Link href="/kata" prefetch={false}>Kata</Link>
            <Link href="/tanda-baca" prefetch={false}>Tanda Baca</Link>
            <Link href="/serapan" prefetch={false}>Serapan</Link>
          </nav>
          <a className="repo-link" href={repoHref} rel="noreferrer" target="_blank">
            <GitHubIcon size={16} />
            <span>GitHub</span>
          </a>
        </div>
      </header>

      <main className="home-main">
        <section className="hero">
          <div className="hero-copy">
            <div className="hero-pill">Ejaan Bahasa Indonesia Edisi Kelima</div>
            <h1>Referensi EYD V yang lebih enak dibaca, dicari, dan dipelajari.</h1>
            <p>
              Situs ini menyusun ulang isi EYD V menjadi pengalaman belajar yang cepat: navigasi ringkas,
              pencarian lokal, halaman bacaan yang fokus, dan jalur materi yang jelas.
            </p>

            <div className="hero-actions">
              <Link className="primary-button" href="/pengantar" prefetch={false}>
                Mulai dari pengantar
                <ArrowRightIcon size={16} />
              </Link>
              <Link className="secondary-button" href="/huruf/kapital" prefetch={false}>
                Buka topik populer
              </Link>
            </div>
          </div>

          <div className="hero-panel">
            <div className="hero-stats">
              <div className="stat-card">
                <strong>{docsIndex.totalPages}</strong>
                <span>halaman rujukan</span>
              </div>
              <div className="stat-card">
                <strong>{docsIndex.totalSections}</strong>
                <span>bagian berjangkar</span>
              </div>
              <div className="stat-card">
                <strong>{homeGroups.length}</strong>
                <span>jalur belajar utama</span>
              </div>
            </div>

            <div className="hero-notes">
              <div>
                <span className="section-kicker">Cara pakai</span>
                <p>Buka kategori, pilih topik, lalu gunakan daftar isi di sisi kanan untuk loncat antarbagian.</p>
              </div>
              <div>
                <span className="section-kicker">Pencarian cepat</span>
                <p>Gunakan tombol cari di halaman materi atau pintasan `Ctrl + K` untuk menemukan istilah EYD.</p>
              </div>
            </div>
          </div>
        </section>

        {introGroup ? (
          <section className="home-section">
            <div className="section-head">
              <div>
                <span className="section-kicker">Dasar resmi</span>
                <h2>Mulai dari konteks dan landasan EYD V</h2>
              </div>
            </div>
            <div className="topic-grid">
              {introGroup.items.map((item) => (
                <Link className="topic-card" href={item.route} key={item.route} prefetch={false}>
                  <span className="topic-card-meta">{item.prefix ?? "Panduan"}</span>
                  <strong>{item.label}</strong>
                  <span className="topic-card-arrow">
                    <ArrowRightIcon size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="home-section">
          <div className="section-head">
            <div>
              <span className="section-kicker">Jalur belajar</span>
              <h2>Empat kelompok materi utama</h2>
            </div>
          </div>

          <div className="group-grid">
            {homeGroups.map((group) => {
              const Icon = getGroupIcon(group.icon);
              return (
                <article className="group-card" key={group.key}>
                  <div className="group-card-top">
                    <span className="group-card-icon">
                      <Icon size={18} />
                    </span>
                    <span className="group-card-meta">
                      {group.totalTopics} topik / {group.totalSections} bagian
                    </span>
                  </div>

                  <h3>{group.title}</h3>
                  <p>{group.summary}</p>

                  <ul className="group-card-list">
                    {group.items.slice(0, 4).map((item) => (
                      <li key={item.route}>{item.label}</li>
                    ))}
                  </ul>

                  {group.overview ? (
                    <Link className="group-card-link" href={group.overview.route} prefetch={false}>
                      Buka {group.title.toLowerCase()}
                      <ArrowRightIcon size={16} />
                    </Link>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
