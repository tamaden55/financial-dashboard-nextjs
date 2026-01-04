# 開発学習メモ

## GitHub Issues の使い方

### 概要
タスク・機能・バグを管理するための機能。今後実装したい機能のメモに最適。

### 基本操作

#### Issue作成
```
GitHub → Issues タブ → New Issue

タイトル: ROE・ROA指標の追加
説明:
## 概要
収益性指標を追加したい

## 実装内容
- [ ] ROE（自己資本利益率）計算機能
- [ ] ROA（総資産利益率）計算機能
- [ ] 判定ロジック実装
- [ ] UIコンポーネント作成

## 入力項目
- 純利益（百万円）
- 自己資本（百万円）
- 総資産（百万円）
```

#### ラベル活用
- `enhancement` - 新機能
- `bug` - バグ修正
- `documentation` - ドキュメント
- `priority: high` - 優先度高

#### コミットとの連携
```bash
# Issueに言及
git commit -m "Add ROE calculator logic (relates to #5)"

# Issue完了時に自動クローズ
git commit -m "Complete ROE feature (closes #5)"
```

### 活用例

**実装したい機能リスト:**
- Issue #1: PER・PBR指標の追加
- Issue #2: 複数銘柄の比較機能
- Issue #3: データ保存機能（LocalStorage）
- Issue #4: CSVエクスポート機能
- Issue #5: ダークモード改善

---

## Pull Request（PR）の使い方

### 概要
コードの変更を「提案」し、マージ前にレビュー・議論する機能。
1人開発でも大きな機能追加時に有用。

### 基本ワークフロー

#### 1. 機能ブランチ作成
```bash
# mainブランチから新しいブランチを作成
git checkout main
git pull origin main
git checkout -b feature/add-roe-calculator
```

#### 2. 開発・コミット
```bash
# 開発を進める
git add .
git commit -m "Add ROE calculator component"
git commit -m "Add ROE calculation logic"
git commit -m "Add tests for ROE calculator"
```

#### 3. プッシュ
```bash
# リモートに機能ブランチをプッシュ
git push origin feature/add-roe-calculator
```

#### 4. PR作成（GitHub上）
```
GitHub → Pull Requests → New Pull Request

base: main ← compare: feature/add-roe-calculator

タイトル: ROE計算機能の追加
説明:
## 変更内容
- ROE（自己資本利益率）計算機能を追加
- 入力フィールド：純利益、自己資本
- 判定ロジック実装（優良/良好/普通/要注意）

## スクリーンショット
[画像を添付]

## チェックリスト
- [x] 動作確認済み
- [x] ビルド成功
- [x] 型エラーなし

## 関連Issue
Closes #5
```

#### 5. セルフレビュー
- 「Files changed」タブで差分を確認
- コード全体を俯瞰
- 問題があればコミット追加

#### 6. マージ
```
GitHub → Merge pull request → Confirm merge
```

#### 7. ローカルでクリーンアップ
```bash
# mainブランチに戻る
git checkout main

# 最新を取得
git pull origin main

# 機能ブランチを削除
git branch -d feature/add-roe-calculator
```

### ブランチ命名規則

```
feature/機能名     - 新機能追加
fix/バグ名         - バグ修正
refactor/対象     - リファクタリング
docs/対象         - ドキュメント更新

例:
feature/add-per-pbr
fix/psr-calculation-error
refactor/component-structure
docs/update-readme
```

### PR使用の判断基準

#### PRを使う（推奨）
- ✅ 大きな機能追加（新しい計算機など）
- ✅ リファクタリング
- ✅ 本番環境に影響する変更
- ✅ 実験的な機能

#### 直接mainにpush（簡略化）
- ✅ タイポ修正
- ✅ 小さなスタイル調整
- ✅ ドキュメント更新
- ✅ 緊急バグ修正

---

## 実践例：PER/PBR機能追加

### 完全なワークフロー

```bash
# 1. Issueを作成（GitHub上）
# Issue #10: PER・PBR指標の追加

# 2. 機能ブランチ作成
git checkout main
git pull origin main
git checkout -b feature/add-per-pbr

# 3. 実装
# - utils/financial.ts に計算関数追加
# - components/valuation-calculator.tsx 作成
# - page.tsx に追加

# 4. コミット（小さく分ける）
git add app/utils/financial.ts
git commit -m "Add PER and PBR calculation functions"

git add app/components/valuation-calculator.tsx
git commit -m "Add valuation calculator component"

git add app/page.tsx
git commit -m "Integrate valuation calculator into main page"

# 5. プッシュ
git push origin feature/add-per-pbr

# 6. PR作成（GitHub上）
# タイトル: PER・PBR指標の追加
# 説明: Closes #10

# 7. セルフレビュー → マージ

# 8. クリーンアップ
git checkout main
git pull origin main
git branch -d feature/add-per-pbr
```

---

## Tips

### マージ後のVercelデプロイ
- mainにマージすると自動的にVercelがデプロイ
- PRブランチでもプレビューURLが生成される

### コミットメッセージの書き方
```
# 良い例
Add PER calculator component
Fix calculation error in PSR logic
Refactor input-field component for reusability
Update README with new features

# 悪い例
update
fix
変更
test
```

### PRの説明テンプレート
```markdown
## 変更内容
[何を変更したか]

## 変更理由
[なぜこの変更が必要か]

## スクリーンショット
[UIの変更がある場合]

## テスト
- [ ] ローカルで動作確認
- [ ] ビルド成功
- [ ] 型エラーなし

## 関連Issue
Closes #番号
```

---

## 次に試すこと

1. **GitHub Issueを作成する**
   - 実装したい機能をリストアップ
   - ラベルを付けて整理

2. **初めてのPRを作成する**
   - 次の大きな機能（PER/PBR追加など）で実践
   - 機能ブランチ → PR → マージの流れを体験

3. **習慣化する**
   - 大きな変更は必ずPR経由
   - 小さな変更は直接main
