# E-Power Italia - Internal Employee Platform

A complete internal employee platform for E-Power Italia, a company that produces highly customizable electric bicycles.

## 🎨 Design System

### Brand Color
- **Primary**: `#52a8b9` - Used for headers, key buttons, and highlights
- **Grayscale**: White, off-white, and dark gray for text and backgrounds
- **Style**: Clean, modern, minimal, tech-industrial with soft rounded corners

### Typography
- Default typography system configured in `/styles/globals.css`
- Sans-serif font family
- Clear hierarchy with proper font weights

## 🔐 User Types & Roles

### Employees
1. **Verniciatore (Painter)** - Painting/coating operations
2. **Meccanico Montaggio (Assembly Technician)** - Bike assembly
3. **Meccanico Smontaggio (Disassembly Technician)** - Disassembly and special work
4. **Area Grafica & Stampa (Graphics & Print Lab)** - Graphics and printing

### Managers
1. **Responsabile Produzione (Production Manager)** - Full production oversight
2. **Responsabile Officina (Workshop Manager)** - Workshop management
3. **Responsabile Grafica (Graphics Manager)** - Graphics department
4. **Amministrazione & Contabilità (Admin & Accounting)** - Financial management

## 📱 App Structure

### Navigation
- **Employees**: Bottom tab bar navigation (mobile-first)
- **Managers**: Side menu navigation with responsive drawer

### Core Screens

#### 1. Login & Authentication
- Email/password login
- Quick login demo buttons for testing
- Demo credentials available in `LoginScreen.tsx`

#### 2. Dashboard
- **Employee Dashboard**: Today's tasks, assigned production, messages, notifications
- **Manager Dashboard**: Production stats, employee performance, issues & alerts

#### 3. Verniciatura (Painting Area)
- List of bikes to paint
- Detailed order view with color information
- Three-phase workflow: Primer → Painting → Finish
- Material tracking
- Phase completion with timestamps

#### 4. Meccanici - Montaggio (Assembly)
- List of bikes to assemble
- Component availability tracking
- Step-by-step assembly checklist
- Issue reporting with photo support (simulated)
- Urgent problem flagging

#### 5. Meccanici - Smontaggio (Disassembly)
- Intervention list (replacements, revisions, disassembly)
- Parts needed tracking
- Mechanic notes
- Defects reporting

#### 6. Area Grafica & Stampa (Graphics & Print)
- Graphics projects list
- Project types: Logo, 3D Render, Print, Design
- File management
- Print status tracking with progress
- Material upload functionality (simulated)

#### 7. Manager Dashboard
- Production overview across all areas
- Real-time employee performance metrics
- Task assignment capabilities
- Problem and alert monitoring
- Statistics and KPIs

#### 8. Amministrazione (Administration)
- Order summary
- Invoice management
- Payment status tracking
- Production costs
- Material usage and inventory
- Monthly statistics with charts

#### 9. Impostazioni (Settings)
- User profile management
- Password change
- Work schedule/shifts
- Holidays and absences
- Notification preferences
- Logout

## 🎯 Key Features

### Role-Based Access
- Each user sees only relevant sections
- Managers have full visibility
- Dynamic navigation based on role

### Visual Progress Tracking
- Progress bars for multi-phase tasks
- Status indicators (pending, in progress, completed)
- Color-coded priorities (high/urgent, medium, low)

### Real-Time Updates
- Task status changes with timestamps
- Issue reporting and tracking
- Notification system

### Mobile-First Design
- Responsive layouts
- Touch-friendly interactions
- Optimized for phone and tablet use

## 🧩 Component Library

### UI Components (Shadcn)
Located in `/components/ui/`:
- Button, Input, Label, Textarea
- Card, Badge, Progress
- Checkbox, Switch
- Tabs, Dialog, Alert
- And more...

### Custom Components
Located in `/components/`:
- `LoginScreen` - Authentication
- `EmployeeBottomNav` - Employee navigation
- `ManagerSideNav` - Manager navigation
- `EmployeeDashboard` - Employee home
- `ManagerDashboard` - Manager home
- `PaintingArea` - Painting operations
- `AssemblyArea` - Assembly operations
- `DisassemblyArea` - Disassembly operations
- `GraphicsArea` - Graphics & print
- `AdminArea` - Administration & accounting
- `ProfileSettings` - User settings

## 🚀 Demo Users

### Quick Login Credentials

**Employees:**
- Painter: `painter@epower.it` / `demo`
- Assembly: `assembly@epower.it` / `demo`
- Disassembly: `disassembly@epower.it` / `demo`
- Graphics: `graphics@epower.it` / `demo`

**Managers:**
- Manager: `manager@epower.it` / `demo`
- Admin: `admin@epower.it` / `demo`

## 📊 Mock Data

All screens use realistic mock data including:
- Bike orders with IDs (B-2024-XXX)
- Customer information
- Production phases and statuses
- Material tracking
- Financial data
- Employee performance metrics

## 🎨 Color Coding

- **Green**: Completed tasks/phases
- **Blue (#52a8b9)**: Primary actions, active states
- **Orange**: Warnings, pending items
- **Red**: Urgent priorities, errors
- **Purple**: Printing/graphics specific
- **Gray**: Neutral, inactive states

## 📱 Responsive Breakpoints

- **Mobile**: Default (< 1024px)
- **Desktop**: lg: breakpoint (≥ 1024px)
- Bottom nav converts to side nav on desktop for managers
- Optimized touch targets for mobile

## 🔄 Workflow Examples

### Painting Workflow
1. View list of bikes to paint
2. Select a bike to see details
3. Complete Primer phase
4. Complete Painting phase
5. Complete Finish phase
6. Track materials used

### Assembly Workflow
1. View bikes to assemble
2. Check component availability
3. Work through assembly checklist
4. Report issues if needed
5. Mark tasks complete

### Manager Workflow
1. View production dashboard
2. Monitor all operational areas
3. Check employee performance
4. Assign tasks to employees
5. Address problems and alerts

## 🛠️ Technical Stack

- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS v4.0
- **Components**: Shadcn/ui
- **Icons**: Lucide React
- **State Management**: React useState hooks
- **Routing**: Component-based navigation

## 📝 Notes

- This is a prototype/demo application
- All data is mocked and stored in component state
- No backend integration (ready for API connection)
- File uploads are simulated
- Perfect for demonstrations and UI/UX testing

## 🎯 Future Enhancements

- Backend API integration
- Real-time notifications
- Actual file upload/download
- Photo capture for issue reporting
- Barcode/QR scanning for bikes
- Time tracking
- Performance analytics
- Export reports
- Multi-language support
