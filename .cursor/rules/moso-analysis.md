# Moso.vn Analysis Task

## Objective
Phân tích toàn bộ hệ thống moso.vn để xuất features, requirements, users.

## Input
- URL: https://moso.vn/
- Codebase (nếu có access)
- Documentation

## Analysis Framework
Sử dụng BMAD + Understand-Anything:

### 1. FEATURE EXTRACTION
```json
{
  "features": [
    {
      "name": "Feature Name",
      "description": "...",
      "type": "core|support|optional",
      "users_affected": ["user_type_1", "user_type_2"],
      "dependencies": ["feature_x", "feature_y"],
      "complexity": "low|medium|high"
    }
  ]
}
```

### 2. USER PERSONAS
```json
{
  "personas": [
    {
      "name": "Persona Name",
      "role": "...",
      "goals": [...],
      "pain_points": [...],
      "features_used": [...]
    }
  ]
}
```

### 3. DOMAIN KNOWLEDGE MAP
```json
{
  "entities": [
    {
      "name": "Entity Name",
      "attributes": ["attr1", "attr2"],
      "relationships": ["rel1->Entity2"]
    }
  ]
}
```

## Output Files
- `artifacts/moso-features.json`
- `artifacts/moso-users.json`
- `artifacts/moso-domain.json`
