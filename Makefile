# Webpack & Bundle Analysis Scripts

# Analyze bundle size
analyze-bundle:
	npm run build && npx @next/bundle-analyzer

# Build with bundle analysis
build-analyze:
	ANALYZE=true npm run build

# Check bundle size
check-bundle:
	npm run build
	du -sh .next/static/chunks/*
	echo "=== Bundle Analysis Complete ==="

# Performance test
perf-test:
	npm run build
	npx lighthouse http://localhost:3000 --output=json --output=html --output-path=./lighthouse-report

# Bundle visualization
bundle-viz:
	npx webpack-bundle-analyzer .next/static/chunks/*.js

# Clean build artifacts
clean:
	rm -rf .next
	rm -rf node_modules/.cache
	rm -rf .swc

# Full clean and rebuild
rebuild:
	make clean
	npm install
	npm run build

.PHONY: analyze-bundle build-analyze check-bundle perf-test bundle-viz clean rebuild
