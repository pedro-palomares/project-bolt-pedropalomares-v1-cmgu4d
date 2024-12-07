# WebContainer Compatibility Guide

## 1. Available Node.js Core Modules

### Fully Compatible Modules
- `assert`
- `buffer`
- `crypto`
- `events`
- `path`
- `querystring`
- `stream`
- `string_decoder`
- `timers`
- `url`
- `util`
- `zlib`

### Limited Compatibility Modules
- `fs` (virtual filesystem only)
- `http`/`https` (browser-based networking)
- `process` (limited environment variables)

## 2. Restrictions and Limitations

### System-Level Restrictions
- No native binary execution
- No direct filesystem access outside WebContainer
- No direct network socket access
- No child process spawning
- No native addons/modules requiring compilation

### Unsupported Node.js Features
- `cluster` module
- `worker_threads` module
- Native C++ addons
- Direct TCP/UDP sockets
- `child_process` module

### Development Tool Limitations
- No C/C++ compiler
- No Rust compiler
- No Python pip or third-party libraries
- Limited shell commands

## 3. Compatible Build Tools and Versions

### Recommended Versions
- **Vite**: ^5.0.0
- **TypeScript**: ^5.0.0
- **ESBuild**: ^0.19.0
- **SWC**: ^1.3.0

### Development Servers
- Vite dev server
- Web dev server
- Live reload capabilities
- HMR support

## 4. Database Support

### Compatible Databases
- SQLite (in-memory or file-based)
- IndexedDB
- LocalStorage
- SessionStorage

### Unsupported Databases
- PostgreSQL
- MySQL
- MongoDB
- Redis

## 5. Available Shell Commands

### Core Commands
```bash
cat
chmod
cp
echo
hostname
kill
ln
ls
mkdir
mv
ps
pwd
rm
rmdir
xxd
```

### Additional Tools
```bash
alias
cd
clear
curl
env
false
getconf
head
sort
tail
touch
true
uptime
which
code
jq
loadenv
node
python
python3
wasm
xdg-open
command
exit
export
source
```

## 6. Best Practices

### Development Workflow
1. Use Vite for web development
2. Prefer Node.js scripts over shell scripts
3. Use JavaScript-implemented databases
4. Implement in-memory storage when possible

### Package Selection
1. Choose browser-compatible packages
2. Avoid packages requiring native bindings
3. Use ESM modules when possible
4. Verify package compatibility before installation

### Performance Optimization
1. Minimize bundle size
2. Use code splitting
3. Implement lazy loading
4. Optimize asset loading

## 7. Common Issues and Solutions

### Package Installation Issues
- Use `npm` or `yarn` for package management
- Verify package compatibility with browser environment
- Check for native dependencies
- Use browser-compatible alternatives

### Build Process
- Configure Vite correctly
- Use appropriate TypeScript settings
- Implement proper module resolution
- Handle environment variables correctly

### Runtime Considerations
- Implement proper error handling
- Use browser-compatible APIs
- Handle storage limitations
- Manage memory efficiently

## 8. Environment Variables

### Available Variables
- `NODE_ENV`
- `VITE_*` prefixed variables
- Custom environment variables

### Configuration
```javascript
// vite.config.js
export default defineConfig({
  define: {
    'process.env': process.env
  }
});
```

## 9. Security Considerations

### Limitations
- No access to system files
- Sandboxed environment
- Limited network access
- No direct OS access

### Best Practices
1. Implement proper input validation
2. Use secure storage methods
3. Handle sensitive data carefully
4. Implement proper authentication

## 10. Deployment

### Supported Providers
- Netlify
- Static hosting platforms
- CDN deployment

### Deployment Process
1. Build static assets
2. Configure environment variables
3. Deploy to supported platform
4. Verify functionality

## 11. Testing

### Compatible Testing Frameworks
- Vitest
- Jest (browser environment)
- Testing Library
- Playwright (E2E)

### Testing Considerations
1. Use browser-compatible assertions
2. Mock system dependencies
3. Handle storage limitations
4. Implement proper cleanup

## 12. Debugging

### Available Tools
- Browser DevTools
- Console logging
- Error tracking
- Performance monitoring

### Debug Process
1. Use browser developer tools
2. Implement proper error logging
3. Monitor performance metrics
4. Track memory usage