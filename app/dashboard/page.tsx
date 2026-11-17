import Link from "next/link";
import { pool } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { stages } from "@/lib/stages";
import { UserNav } from "@/components/UserNav";

type Assessment = { id: string; stage_index: number; stage_letter: string; counts: number[]; selections: number[][]; total_signals: number; created_at: Date };

function TrendChart({ items }: { items: Assessment[] }) {
  const data = [...items].reverse().slice(-14); const w = 700; const h = 240; const px = 42; const py = 24;
  const points = data.map((item, i) => `${data.length === 1 ? w / 2 : px + i * ((w - px * 2) / (data.length - 1))},${py + item.stage_index * ((h - py * 2) / 5)}`).join(" ");
  return <div className="chartWrap"><svg className="chart" viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Your STOKED stage over time">{stages.map((stage, i) => { const y = py + i * ((h - py * 2) / 5); return <g key={stage.letter}><line x1={px} x2={w-px} y1={y} y2={y} stroke="#e1e5df" /><text x="8" y={y+4} fill={stage.color} fontWeight="700" fontSize="12">{stage.letter}</text></g>; })}{data.length > 1 && <polyline points={points} fill="none" stroke="#1d5d54" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />}{data.map((item, i) => { const x = data.length === 1 ? w/2 : px + i*((w-px*2)/(data.length-1)); const y = py+item.stage_index*((h-py*2)/5); return <circle key={item.id} cx={x} cy={y} r="7" fill={stages[item.stage_index].color} stroke="white" strokeWidth="3" />; })}</svg><div className="chartLabels"><span>Connection</span><span>Higher urgency</span></div></div>;
}

export default async function Dashboard() {
  const user = await requireUser();
  const { rows } = await pool.query<Assessment>("SELECT * FROM assessments WHERE user_id = $1 ORDER BY created_at DESC LIMIT 100", [user.id]);
  const latest = rows[0];
  const last30 = rows.filter(r => Date.now() - new Date(r.created_at).getTime() < 30*86400000).length;
  const average = rows.length ? rows.reduce((sum, r) => sum + r.stage_index, 0) / rows.length : 0;
  const common = rows.length ? stages[Math.round(average)] : null;
  return <main className="dashboard"><UserNav name={user.name} /><div className="dashHeading"><div><p className="eyebrow">Your awareness dashboard</p><h1>See the pattern,<br />not just the moment.</h1></div><Link className="button primary" href="/check-in">New check-in →</Link></div>
    {!rows.length ? <section className="empty"><h2>Your story starts with one honest check-in.</h2><p>Once you complete it, this dashboard will show your trends and help you notice changes early.</p><Link className="button primary" href="/check-in">Take your first check-in</Link></section> : <>
      <section className="metrics"><div><small>Current location</small><strong style={{color: stages[latest.stage_index].color}}>{stages[latest.stage_index].name}</strong></div><div><small>Last 30 days</small><strong>{last30} check-in{last30 === 1 ? "" : "s"}</strong></div><div><small>Typical location</small><strong>{common?.name}</strong></div></section>
      <section className="panel chartPanel"><div className="panelTitle"><div><p className="eyebrow">Your trajectory</p><h2>Last {Math.min(rows.length, 14)} check-ins</h2></div><p>Moving upward means moving toward connection.</p></div><TrendChart items={rows} /></section>
      <section className="history"><div className="panelTitle"><div><p className="eyebrow">Check-in history</p><h2>Every honest moment</h2></div></div>{rows.map(item => { const stage = stages[item.stage_index]; return <details className="historyItem" key={item.id}><summary><span className="historyStage" style={{background: stage.color}}>{stage.letter}</span><span><strong>{stage.name}</strong><small>{new Intl.DateTimeFormat("en-US", {dateStyle:"medium", timeStyle:"short"}).format(new Date(item.created_at))}</small></span><span className="historySignals">{item.total_signals} signals</span></summary><div className="historyDetail"><div className="miniBars">{stages.map((s,i) => <div key={s.letter}><span>{s.letter}</span><i><b style={{width: `${Math.max(0, (item.counts[i]/s.feelings.length)*100)}%`, background:s.color}} /></i><strong>{item.counts[i]}</strong></div>)}</div><p className="nextStep"><strong>Next honest step:</strong> {stage.next}</p></div></details>; })}</section>
    </>}
  </main>;
}
