const COLORS = [
  { bg: '#E6F1FB', text: '#0C447C' },
  { bg: '#E1F5EE', text: '#085041' },
  { bg: '#EEEDFE', text: '#3C3489' },
  { bg: '#FAEEDA', text: '#633806' },
  { bg: '#FBEAF0', text: '#72243E' },
  { bg: '#EAF3DE', text: '#27500A' },
];

const FEEDBACK_TAGS = {
  'written':   { label: 'Written feedback',  bg: '#E6F1FB', text: '#0C447C' },
  'real-time': { label: 'Real-time feedback', bg: '#EAF3DE', text: '#27500A' },
  'async':     { label: 'Async message',      bg: '#EEEDFE', text: '#3C3489' },
  '1:1':       { label: '1:1 only',           bg: '#FAEEDA', text: '#633806' },
  'any':       { label: 'Any style works',    bg: '#F1EFE8', text: '#444441' },
};

const SAMPLE = [
  {
    id: 1,
    name: 'Maya Rodriguez',
    role: 'Senior Program Manager',
    pronouns: 'she/her',
    year: '2019',
    sign: 'Scorpio',
    funfact: 'Ran a half-marathon in every US state — 23 down, 27 to go.',
    supervision: 'Prefers autonomy with weekly 1:1 check-ins. Wants context and the why before being handed a task. Comes to you when blocked, not before.',
    feedback: 'written',
    motivation: 'Complex problems, visible impact, mentoring junior staff.',
    workstyle: 'Deep focus / async-first',
    notes: 'Targeting director track. Flagged interest in budget ownership next cycle.',
  },
  {
    id: 2,
    name: 'Jordan Kim',
    role: 'UX Researcher',
    pronouns: 'they/them',
    year: '2021',
    sign: 'Aquarius',
    funfact: 'Can identify any typeface by sight. Wins every design trivia night.',
    supervision: 'Thrives with clear deliverables and creative freedom on how to get there. Regular feedback loops preferred over big-batch reviews.',
    feedback: 'real-time',
    motivation: 'User advocacy, presenting findings, cross-team collaboration.',
    workstyle: 'Collaborative / synchronous',
    notes: 'Expressed interest in workshop facilitation. Pair with external stakeholder project.',
  },
  {
    id: 3,
    name: 'Darnell Osei',
    role: 'Operations Coordinator',
    pronouns: 'he/him',
    year: '2023',
    sign: 'Taurus',
    funfact: 'Grows heirloom tomatoes and enters county fair competitions every summer.',
    supervision: 'Appreciates structured onboarding and clear checklists. Building confidence — prefers affirmation alongside corrections.',
    feedback: '1:1',
    motivation: 'Keeping things running smoothly, being the reliable backbone of the team.',
    workstyle: 'Structured / routine-driven',
    notes: 'Strong candidate for systems documentation project. Check in monthly on workload.',
  },
];

let members = [...SAMPLE];
let activeFilter = 'all';

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function colorFor(id) {
  return COLORS[(id - 1) % COLORS.length];
}

function renderGrid() {
  const grid = document.getElementById('grid');
  const filtered = activeFilter === 'all'
    ? members
    : members.filter(m => m.feedback === activeFilter);

  document.getElementById('count-badge').textContent =
    members.length + ' member' + (members.length === 1 ? '' : 's');

  grid.innerHTML = '';

  filtered.forEach(m => {
    const c = colorFor(m.id);
    const ftag = FEEDBACK_TAGS[m.feedback];
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-avatar" style="background:${c.bg};color:${c.text}">${initials(m.name)}</div>
      <div class="card-name">${m.name}</div>
      <div class="card-role">${m.role}</div>
      <div class="card-meta">
        ${m.sign ? `<div class="meta-row"><span class="meta-label">Sign</span><span class="meta-val">${m.sign}</span></div>` : ''}
        ${m.funfact ? `<div class="meta-row"><span class="meta-label">Fun fact</span><span class="meta-val">${m.funfact.slice(0, 60)}${m.funfact.length > 60 ? '…' : ''}</span></div>` : ''}
      </div>
      ${ftag ? `<div class="tag" style="background:${ftag.bg};color:${ftag.text}">${ftag.label}</div>` : ''}
    `;
    card.addEventListener('click', () => openDrawer(m.id));
    grid.appendChild(card);
  });

  const addCard = document.createElement('div');
  addCard.className = 'add-card';
  addCard.innerHTML = `<div class="plus-icon">+</div><span>Add member</span>`;
  addCard.addEventListener('click', () => openModal());
  grid.appendChild(addCard);
}

function openDrawer(id) {
  const m = members.find(x => x.id === id);
  if (!m) return;

  const c = colorFor(m.id);
  const ftag = FEEDBACK_TAGS[m.feedback];

  document.getElementById('drawer-title').textContent = m.name;
  document.getElementById('drawer-body').innerHTML = `
    <div class="drawer-top">
      <div class="drawer-avatar" style="background:${c.bg};color:${c.text}">${initials(m.name)}</div>
      <div>
        <div class="drawer-name">${m.name}</div>
        <div class="drawer-role">${m.role}</div>
        ${m.pronouns ? `<div class="drawer-pronouns">${m.pronouns}${m.year ? ' &middot; Joined ' + m.year : ''}</div>` : ''}
      </div>
    </div>
    <hr class="section-divider"/>
    ${m.sign ? `<div class="section"><div class="section-label">Horoscope</div><div class="section-value">${m.sign}</div></div>` : ''}
    ${m.funfact ? `<div class="section"><div class="section-label">Fun fact</div><div class="section-value">${m.funfact}</div></div>` : ''}
    <hr class="section-divider"/>
    ${m.supervision ? `<div class="section"><div class="section-label">Supervision philosophy</div><div class="section-value">${m.supervision}</div></div>` : ''}
    ${m.feedback ? `<div class="section"><div class="section-label">How to give feedback</div><div class="section-value">${ftag ? `<span class="tag" style="background:${ftag.bg};color:${ftag.text}">${ftag.label}</span>` : m.feedback}</div></div>` : ''}
    ${m.motivation ? `<div class="section"><div class="section-label">What motivates them</div><div class="section-value">${m.motivation}</div></div>` : ''}
    ${m.workstyle ? `<div class="section"><div class="section-label">Work style</div><div class="section-value">${m.workstyle}</div></div>` : ''}
    <hr class="section-divider"/>
    <div class="private-section">
      <div class="private-label">Private manager notes</div>
      <div class="section-value">${m.notes || '<span style="color:var(--color-text-tertiary)">No notes added.</span>'}</div>
    </div>
  `;

  document.getElementById('drawer-overlay').classList.add('open');
}

function openModal() {
  ['f-name', 'f-role', 'f-pronouns', 'f-year', 'f-funfact', 'f-supervision', 'f-motivation', 'f-notes'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  ['f-sign', 'f-feedback', 'f-workstyle'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.getElementById('modal-overlay').classList.add('open');
}

function saveMember() {
  const name = document.getElementById('f-name').value.trim();
  const role = document.getElementById('f-role').value.trim();
  if (!name || !role) {
    alert('Name and role are required.');
    return;
  }
  const newId = members.length ? Math.max(...members.map(m => m.id)) + 1 : 1;
  members.push({
    id: newId,
    name,
    role,
    pronouns:   document.getElementById('f-pronouns').value.trim(),
    year:       document.getElementById('f-year').value.trim(),
    sign:       document.getElementById('f-sign').value,
    funfact:    document.getElementById('f-funfact').value.trim(),
    supervision:document.getElementById('f-supervision').value.trim(),
    feedback:   document.getElementById('f-feedback').value,
    motivation: document.getElementById('f-motivation').value.trim(),
    workstyle:  document.getElementById('f-workstyle').value,
    notes:      document.getElementById('f-notes').value.trim(),
  });
  document.getElementById('modal-overlay').classList.remove('open');
  renderGrid();
}

// Event listeners — call this after DOM is ready
function init() {
  document.getElementById('close-drawer').addEventListener('click', () => {
    document.getElementById('drawer-overlay').classList.remove('open');
  });
  document.getElementById('drawer-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('drawer-overlay'))
      document.getElementById('drawer-overlay').classList.remove('open');
  });
  document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('modal-overlay').classList.remove('open');
  });
  document.getElementById('cancel-modal').addEventListener('click', () => {
    document.getElementById('modal-overlay').classList.remove('open');
  });
  document.getElementById('open-modal-btn').addEventListener('click', openModal);
  document.getElementById('save-member').addEventListener('click', saveMember);

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGrid();
    });
  });

  renderGrid();
}

document.addEventListener('DOMContentLoaded', init);
