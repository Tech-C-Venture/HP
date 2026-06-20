<template>
  <div>
    <!-- Hero Section -->
    <section class="hero section-padding">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Tech.C Ventureについて</h1>
          <p class="hero-description">
            自走できるエンジニアを育成する団体として、メンバー全員が高め合い、学校の領域を超えて成長できる環境を提供しています。
          </p>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="section-padding">
      <div class="container">
        <div class="text-center mb-2xl">
          <h2>私たちのミッション</h2>
        </div>

        <div class="mission-grid">
          <div class="mission-content">
            <h3>基礎学習から実践まで</h3>
            <p>
              Tech.C.Ventureはプログラミングの基礎から学習し、外部プロジェクトや各学年・将来就職する企業でのプロジェクトを牽引できる人材を育成します。
            </p>

            <h3>継続的な成長</h3>
            <p>
              Tech.C.Ventureのメンバーは止まりません。常に最新情報を追い求め、自分の力で社会に貢献できる人材を育成します。
            </p>

            <h3>学校の枠を超えた学び</h3>
            <p>
              学校のカリキュラムにとらわれず、実際の開発現場で求められるスキルと知識を身につけることができます。
            </p>
          </div>

          <div class="mission-image">
            <!-- 画像は後で追加 -->
            <div class="mission-placeholder">
              <p>ミッション画像</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Activities Section -->
    <section class="section-padding" style="background-color: var(--color-surface);">
      <div class="container">
        <div class="text-center mb-2xl">
          <h2>活動実績</h2>
          <p class="text-muted">
            これまでの主要な活動と成果をご紹介します。
          </p>
        </div>

        <div class="grid grid-cols-2">
          <div class="activity-item">
            <div class="activity-icon">📚</div>
            <h3>学習プログラム</h3>
            <p>基礎から応用まで体系的なプログラミング学習</p>
            <ul>
              <li>Web開発基礎（HTML/CSS/JavaScript）</li>
              <li>フレームワーク学習（React/Vue/Angular）</li>
              <li>バックエンド開発（Node.js/Python/Go）</li>
              <li>データベース設計・運用</li>
            </ul>
          </div>

          <div class="activity-item">
            <div class="activity-icon">🚀</div>
            <h3>プロジェクト開発</h3>
            <p>実際のWebアプリケーション開発プロジェクト</p>
            <ul>
              <li>ECサイト開発プロジェクト</li>
              <li>SNSアプリケーション開発</li>
              <li>企業向けシステム開発</li>
              <li>オープンソースプロジェクト貢献</li>
            </ul>
          </div>

          <div class="activity-item">
            <div class="activity-icon">👥</div>
            <h3>チーム活動</h3>
            <p>協働型開発とコミュニケーションスキルの向上</p>
            <ul>
              <li>アジャイル開発手法の実践</li>
              <li>コードレビューとペアプログラミング</li>
              <li>プレゼンテーション・発表</li>
              <li>技術勉強会・ワークショップ開催</li>
            </ul>
          </div>

          <div class="activity-item">
            <div class="activity-icon">🏆</div>
            <h3>成果・実績</h3>
            <p>メンバーの成長と外部評価</p>
            <ul>
              <li>ハッカソン入賞実績</li>
              <li>企業インターンシップ獲得</li>
              <li>技術ブログ・記事投稿</li>
              <li>就職・転職成功事例</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Mentors Section -->
    <section class="section-padding">
      <div class="container">
        <div class="text-center mb-2xl">
          <h2>メンター紹介</h2>
          <p class="text-muted">
            経験豊富なエンジニアがメンバーの成長をサポートします。
          </p>
        </div>

        <div class="mentors-grid">
          <div class="mentor-card">
            <div class="mentor-avatar">
              <img src="/images/senzai.jpeg" alt="木戸 亮輔" class="mentor-image">
            </div>
            <h3>木戸 亮輔</h3>
            <p class="mentor-role">フルスタックエンジニア</p>
            <p class="mentor-description">
              Tech.C Ventureの創設者。小学生時代からの開発歴があり学校サークルの在り方を変えようとしています。当団体ではIT初学者が躓かないように優しく支える場所を目指しています。
            </p>
            <div class="mentor-skills">
              <span class="skill-tag">Next.js</span>
              <span class="skill-tag">TypeScript</span>
              <span class="skill-tag">AWS</span>
              <span class="skill-tag">Cloudflare</span>
              <span class="skill-tag">Go</span>
              <span class="skill-tag">Terraform</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Join Flow Section -->
    <section id="join" class="section-padding" style="background-color: var(--color-surface);">
      <div class="container">
        <div class="text-center mb-2xl">
          <h2>参加フロー</h2>
          <p class="text-muted">
            Tech.C Ventureへの参加は以下のステップで進めます。
          </p>
        </div>

        <div class="flow-steps">
          <div class="flow-step">
            <div class="step-number">1</div>
            <h3>申し込み</h3>
            <p>興味を持った方は、まずはお気軽にお申し込みください。簡単なフォームに記入していただきます。</p>
          </div>

          <div class="flow-arrow">→</div>

          <div class="flow-step">
            <div class="step-number">2</div>
            <h3>面談</h3>
            <p>オンラインまたはオフラインでの面談を実施します。現在のスキルレベルや目標をお聞きします。</p>
          </div>

          <div class="flow-arrow">→</div>

          <div class="flow-step">
            <div class="step-number">3</div>
            <h3>活動開始</h3>
            <p>あなたのレベルに合わせた学習プランを作成し、メンターと共に活動を開始します。</p>
          </div>
        </div>

      </div>
    </section>

    <!-- FAQ Section -->
    <section class="section-padding" style="background-color: var(--color-surface);">
      <div class="container">
        <div class="text-center mb-2xl">
          <h2>よくある質問</h2>
        </div>

        <div class="faq-list">
          <div class="faq-item">
            <h3>プログラミング初心者でも参加できますか？</h3>
            <p>
              はい、プログラミング初心者の方も歓迎します。基礎から学習できるカリキュラムを用意しており、メンターがしっかりとサポートします。
            </p>
          </div>

          <div class="faq-item">
            <h3>活動頻度はどのくらいですか？</h3>
            <p>
              月1回の勉強会やプロジェクト活動を基本としています。メンバーの都合に合わせて柔軟に調整可能です。
            </p>
          </div>

          <div class="faq-item">
            <h3>参加費用はかかりますか？</h3>
            <p>
              基本的な学習プログラムは無料で参加できます。一部の特別なワークショップや教材については別途費用をいただく場合があります。
            </p>
          </div>

          <div class="faq-item">
            <h3>オンラインでの参加は可能ですか？</h3>
            <p>
              はい、オンラインでの参加も可能です。遠方にお住まいの方でも問題なく活動に参加していただけます。
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// SEO設定
useSeoMeta({
  title: 'Tech.C Ventureについて | 自走できるエンジニア育成団体',
  description: 'Tech.C Ventureの団体概要、活動実績、メンター紹介、参加フローなどの詳細情報をご紹介します。',
  ogTitle: 'Tech.C Ventureについて | 自走できるエンジニア育成団体',
  ogDescription: 'Tech.C Ventureの団体概要、活動実績、メンター紹介、参加フローなどの詳細情報をご紹介します。',
  ogType: 'website'
})

// 構造化データは後で追加
</script>

<style scoped>
.mission-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3xl);
  align-items: center;
}

.mission-content h3 {
  margin-top: var(--space-xl);
  margin-bottom: var(--space-md);
}

.mission-content h3:first-child {
  margin-top: 0;
}

.mission-image {
  text-align: center;
}

.mission-img {
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

.activity-item {
  background: white;
  padding: var(--space-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
}

.activity-icon {
  font-size: 3rem;
  margin-bottom: var(--space-md);
}

.activity-item h3 {
  margin-bottom: var(--space-md);
  color: var(--color-accent);
}

.activity-item ul {
  list-style: none;
  padding: 0;
}

.activity-item li {
  padding: var(--space-xs) 0;
  border-bottom: 1px solid var(--color-border);
}

.activity-item li:last-child {
  border-bottom: none;
}

.mentors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-xl);
}

.mentor-card {
  background: white;
  padding: var(--space-xl);
  border-radius: var(--radius-lg);
  text-align: center;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
}

.mentor-avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto var(--space-md);
  border-radius: 50%;
  overflow: hidden;
}

.mentor-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mentor-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-surface);
  font-size: 3rem;
}

.mission-placeholder {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  color: var(--color-text-muted);
  font-style: italic;
}

.mentor-role {
  color: var(--color-accent);
  font-weight: 600;
  margin-bottom: var(--space-md);
}

.mentor-description {
  font-size: 0.875rem;
  margin-bottom: var(--space-md);
}

.mentor-skills {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  justify-content: center;
}

.skill-tag {
  background-color: var(--color-surface);
  color: var(--color-text);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
}

.flow-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xl);
  margin-bottom: var(--space-2xl);
}

.flow-step {
  text-align: center;
  flex: 1;
  max-width: 280px;
}

.step-number {
  width: 60px;
  height: 60px;
  background-color: var(--color-accent);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto var(--space-md);
}

.flow-arrow {
  font-size: 1.5rem;
  color: var(--color-accent);
  font-weight: bold;
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background: white;
  padding: var(--space-xl);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-md);
  border: 1px solid var(--color-border);
}

.faq-item h3 {
  color: var(--color-accent);
  margin-bottom: var(--space-md);
}

.faq-item p {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .mission-grid {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }

  .mission-image {
    order: -1;
  }

  .flow-steps {
    flex-direction: column;
    gap: var(--space-lg);
  }

  .flow-arrow {
    transform: rotate(90deg);
  }

  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
}
</style>